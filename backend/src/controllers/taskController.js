const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.getTasksByBoard = async (req, res, next) => {
  try {
    const tasks = await Task.find({ board: req.params.boardId });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
