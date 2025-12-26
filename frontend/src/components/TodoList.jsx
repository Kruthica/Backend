import { useState, useEffect, useMemo } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api'
import AddTodoForm from './AddTodoForm'
import TodoItem from './TodoItem'
import TodoFilters from './TodoFilters'
import './TodoList.css'

const TodoList = ({ userId, showToast = () => {} }) => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, priority, alphabetical

  useEffect(() => {
    fetchTodos()
  }, [userId])

  const fetchTodos = async () => {
    setLoading(true)
    setError('')
    const result = await getTodos(userId)
    if (result.success) {
      setTodos(result.data.todos || [])
    } else {
      setError(result.error || 'Failed to load todos')
    }
    setLoading(false)
  }

  const handleAddTodo = async (todoData) => {
    const result = await createTodo(userId, todoData)
    if (result.success) {
      setTodos([result.data.todo, ...todos])
      showToast('Todo created successfully!', 'success')
      return true
    } else {
      const errorMsg = result.error || 'Failed to create todo'
      setError(errorMsg)
      showToast(errorMsg, 'error')
      return false
    }
  }

  const handleUpdateTodo = async (todoId, updates) => {
    const result = await updateTodo(userId, todoId, updates)
    if (result.success) {
      setTodos(todos.map(todo => 
        todo._id === todoId ? result.data.todo : todo
      ))
      showToast('Todo updated successfully!', 'success')
      return true
    } else {
      const errorMsg = result.error || 'Failed to update todo'
      setError(errorMsg)
      showToast(errorMsg, 'error')
      return false
    }
  }

  const handleDeleteTodo = async (todoId) => {
    const result = await deleteTodo(userId, todoId)
    if (result.success) {
      setTodos(todos.filter(todo => todo._id !== todoId))
      showToast('Todo deleted successfully!', 'success')
      return true
    } else {
      const errorMsg = result.error || 'Failed to delete todo'
      setError(errorMsg)
      showToast(errorMsg, 'error')
      return false
    }
  }

  const handleBulkDeleteCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed)
    if (completedTodos.length === 0) return

    if (!window.confirm(`Delete ${completedTodos.length} completed todo(s)?`)) {
      return
    }

    try {
      const deletePromises = completedTodos.map(todo => deleteTodo(userId, todo._id))
      await Promise.all(deletePromises)
      setTodos(todos.filter(todo => !todo.completed))
      showToast(`Deleted ${completedTodos.length} completed todo(s)!`, 'success')
    } catch (error) {
      showToast('Failed to delete completed todos', 'error')
    }
  }

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(query) ||
        (todo.description && todo.description.toLowerCase().includes(query))
      )
    }

    // Apply status filter
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return sorted
  }, [todos, filter, searchQuery, sortBy])

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length
  const activeCount = totalCount - completedCount

  if (loading) {
    return <div className="todo-list-loading">Loading todos...</div>
  }

  return (
    <div className="todo-list">
      {error && (
        <div className="todo-error-message">
          <div className="error-content">
            <strong>Error:</strong> {error}
          </div>
          <div className="error-actions">
            <button className="retry-button" onClick={fetchTodos}>
              Retry
            </button>
            <button className="close-error-button" onClick={() => setError('')}>
              ×
            </button>
          </div>
        </div>
      )}

      <AddTodoForm onAdd={handleAddTodo} />

      {totalCount > 0 && (
        <>
          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCount={totalCount}
            activeCount={activeCount}
            completedCount={completedCount}
            onBulkDelete={handleBulkDeleteCompleted}
          />
        </>
      )}

      <div className="todos-container">
        {loading ? (
          <div className="todo-list-loading">
            <div className="loading-spinner"></div>
            <p>Loading todos...</p>
          </div>
        ) : filteredAndSortedTodos.length === 0 ? (
          <div className="no-todos">
            {totalCount === 0 ? (
              <>
                <div className="empty-state-icon">📝</div>
                <p className="empty-state-title">No todos yet</p>
                <p className="empty-state-message">Add one above to get started!</p>
              </>
            ) : searchQuery ? (
              <>
                <div className="empty-state-icon">🔍</div>
                <p className="empty-state-title">No todos found</p>
                <p className="empty-state-message">Try adjusting your search query</p>
              </>
            ) : (
              <>
                <div className="empty-state-icon">✅</div>
                <p className="empty-state-title">No {filter === 'active' ? 'active' : 'completed'} todos</p>
                <p className="empty-state-message">All caught up!</p>
              </>
            )}
          </div>
        ) : (
          filteredAndSortedTodos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList

