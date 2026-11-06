import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [300, 'Task title cannot exceed 300 characters']
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Ongoing', 'Completed'],
        message: 'Status must be Pending, Ongoing, or Completed'
      },
      default: 'Pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
