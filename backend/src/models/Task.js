const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  column: { type: String, default: 'todo' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
