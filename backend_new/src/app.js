import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import todoRoutes from './routes/todo.routes.js';

const app = express(); // create an express app

// CORS middleware to allow frontend requests from any origin
// In production, you should restrict this to your actual domain
app.use(cors({
  origin: process.env.FRONTEND_URL || true, // Allow all origins in dev, restrict in production
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;