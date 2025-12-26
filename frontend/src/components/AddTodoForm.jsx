import { useState } from 'react'
import './AddTodoForm.css'

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    const success = await onAdd({
      title: title.trim(),
      description: description.trim(),
    })

    if (success) {
      setTitle('')
      setDescription('')
    }
    setLoading(false)
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="form-icon">✨</span>
        <h3 className="form-title">Add New Task</h3>
      </div>
      <div className="form-inputs">
        <input
          type="text"
          className="todo-title-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          className="todo-description-input"
          placeholder="Add description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows="2"
        />
      </div>
      {error && <div className="form-error">{error}</div>}
      <button
        type="submit"
        className="add-todo-button"
        disabled={loading || !title.trim()}
      >
        <span className="button-icon">+</span>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTodoForm

