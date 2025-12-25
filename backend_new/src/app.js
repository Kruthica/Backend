import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express(); // create an express app

// Middleware to parse JSON bodies
app.use(express.json());

// Example route: http://localhost:8000/api/v1/users/register
app.use('/api/v1/users', userRoutes);

export default app;