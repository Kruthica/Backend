import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import Dashboard from './pages/Dashboard'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  return user ? children : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }) => {
  const { user } = useUser()
  return user ? <Navigate to="/dashboard" replace /> : children
}

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <div className="app">
                <div className="app-container">
                  <h1 className="app-name-header">TO-DO APP</h1>
                  <h2 className="app-title">Login</h2>
                  <p className="app-subtitle">Welcome back! Please login to continue</p>
                  <LoginForm />
                </div>
              </div>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <div className="app">
                <div className="app-container">
                  <h1 className="app-name-header">TO-DO APP</h1>
                  <h2 className="app-title">User Registration</h2>
                  <p className="app-subtitle">Create your account to get started</p>
                  <RegistrationForm />
                </div>
              </div>
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

