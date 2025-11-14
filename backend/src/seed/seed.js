require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User');
const Board = require('../models/Board');
const Task = require('../models/Task');

async function seed() {
  await connectDB();
  await User.deleteMany();
  await Board.deleteMany();
  await Task.deleteMany();

  const user = await User.create({ name: 'Seed User', email: 'seed@example.com', password: 'password123' });
  const board = await Board.create({ title: 'Sample Board', description: 'A seeded board', owner: user._id });

  await Task.create({ title: 'Task 1', description: 'First task', board: board._id, column: 'todo' });
  await Task.create({ title: 'Task 2', description: 'Second task', board: board._id, column: 'inprogress' });
  await Task.create({ title: 'Task 3', description: 'Third task', board: board._id, column: 'done' });

  console.log('Seed data created. Email:', user.email, 'Password: password123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
