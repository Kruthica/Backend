import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import TodoList from '../components/TodoList'
import ToastContainer from '../components/ToastContainer'
import ThemeSelector from '../components/ThemeSelector'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useUser()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <p>Please register first</p>
          <button onClick={() => navigate('/')}>Go to Registration</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-top">
            <div className="app-branding">
              <h1 className="app-name">TO-DO APP</h1>
            </div>
            <div className="header-actions">
              <ThemeSelector />
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="user-info">
            <h2>Welcome, {user.username}!</h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <div className="dashboard-content">
          <h2>My To-Do List</h2>
          <TodoList userId={user.id} showToast={showToast} />
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

export default Dashboard

