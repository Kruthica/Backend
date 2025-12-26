import { Todo } from '../models/todo.model.js';

// Get all todos for a user
const getTodos = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message,
    });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const todo = await Todo.create({
      userId,
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message,
    });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description, completed } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = completed;

    const todo = await Todo.findByIdAndUpdate(
      todoId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message,
    });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message,
    });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };

