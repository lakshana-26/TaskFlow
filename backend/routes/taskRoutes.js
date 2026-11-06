import express from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task.js';

const router = express.Router();

// Helper to check valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks - Fetch all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks - Add a new task
router.post('/', async (req, res, next) => {
  try {
    const { title, status } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required and cannot be empty.'
      });
    }

    const taskData = {
      title: title.trim()
    };

    if (status) {
      if (!['Pending', 'Ongoing', 'Completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status must be Pending, Ongoing, or Completed.'
        });
      }
      taskData.status = status;
    }

    const newTask = await Task.create(taskData);

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/tasks/:id - Update task status
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.'
      });
    }

    if (!status || !['Pending', 'Ongoing', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status (Pending, Ongoing, or Completed) is required.'
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully.',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.'
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
});

export default router;
