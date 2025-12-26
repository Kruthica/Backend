import { useState } from 'react'
import './TodoItem.css'

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [loading, setLoading] = useState(false)

  const handleToggleComplete = async () => {
    setLoading(true)
    await onUpdate(todo._id, { completed: !todo.completed })
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editTitle.trim()) return

    setLoading(true)
    const success = await onUpdate(todo._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    })
    if (success) {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      setLoading(true)
      await onDelete(todo._id)
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className={`todo-item editing ${todo.completed ? 'completed' : ''}`}>
        <div className="todo-edit-form">
          <input
            type="text"
            className="edit-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={loading}
            placeholder="Todo title"
          />
          <textarea
            className="edit-description-input"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={loading}
            placeholder="Description (optional)"
            rows="2"
          />
          <div className="edit-actions">
            <div className="edit-buttons">
              <button
                className="save-button"
                onClick={handleSave}
                disabled={loading || !editTitle.trim()}
              >
                Save
              </button>
              <button
                className="cancel-button"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox-container">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={loading}
        />
      </div>
      <div className="todo-content" onClick={() => !loading && setIsEditing(true)}>
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-date">
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
          disabled={loading}
          title="Edit"
        >
          ✏️
        </button>
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={loading}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TodoItem

