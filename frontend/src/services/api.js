import axios from 'axios'

// Use relative URLs so Vite proxy handles the requests
const API_BASE_URL = '/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleError = (error) => {
  // Network error (backend not running or connection refused)
  if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    const backendUrl = `http://${host}:8000`
    return {
      success: false,
      error: `Cannot connect to backend server at ${backendUrl}. Please make sure the backend server is running. Open a terminal and run: npm run dev`,
      status: null,
    }
  }
  
  // Server responded with error
  return {
    success: false,
    error: error.response?.data?.message || error.message || 'An error occurred',
    status: error.response?.status,
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/users/login', loginData)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

// Todo API functions
export const getTodos = async (userId) => {
  try {
    const response = await api.get(`/todos/${userId}`)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const createTodo = async (userId, todoData) => {
  try {
    const response = await api.post(`/todos/${userId}`, todoData)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const updateTodo = async (userId, todoId, todoData) => {
  try {
    const response = await api.put(`/todos/${userId}/${todoId}`, todoData)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const deleteTodo = async (userId, todoId) => {
  try {
    const response = await api.delete(`/todos/${userId}/${todoId}`)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export default api

