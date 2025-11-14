const User = require('../models/User');
const jwt = require('jsonwebtoken');

function genToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) { res.status(400); return next(new Error('Email already registered')); }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token: genToken(user._id) });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) { res.status(400); return next(new Error('Invalid credentials')); }
    const matched = await user.matchPassword(password);
    if (!matched) { res.status(400); return next(new Error('Invalid credentials')); }
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token: genToken(user._id) });
  } catch (err) { next(err); }
};
