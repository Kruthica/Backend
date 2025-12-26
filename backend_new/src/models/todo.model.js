import mongoose, { Schema } from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Todo = mongoose.model('Todo', todoSchema);

