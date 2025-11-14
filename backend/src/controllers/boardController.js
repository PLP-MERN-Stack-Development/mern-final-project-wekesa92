const Board = require('../models/Board');

exports.createBoard = async (req, res, next) => {
  try {
    const board = await Board.create({ ...req.body, owner: req.user._id });
    res.status(201).json(board);
  } catch (err) { next(err); }
};

exports.getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({ $or: [ { owner: req.user._id }, { members: req.user._id } ] });
    res.json(boards);
  } catch (err) { next(err); }
};

exports.getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) { res.status(404); return next(new Error('Not found')); }
    res.json(board);
  } catch (err) { next(err); }
};

exports.updateBoard = async (req, res, next) => {
  try {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(board);
  } catch (err) { next(err); }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
