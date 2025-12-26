import { Router } from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controller/todo.controller.js';

const router = Router();

// All routes are prefixed with /api/v1/todos/:userId
router.route('/:userId').get(getTodos).post(createTodo);
router.route('/:userId/:todoId').put(updateTodo).delete(deleteTodo);

export default router;

