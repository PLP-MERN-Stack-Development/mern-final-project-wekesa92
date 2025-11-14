const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({ ...req.body, author: req.user._id });
    res.status(201).json(comment);
  } catch (err) { next(err); }
};

exports.getCommentsByTask = async (req, res, next) => {
  try {
    const comments = await Comment.find({ task: req.params.taskId }).populate('author', 'name');
    res.json(comments);
  } catch (err) { next(err); }
};
