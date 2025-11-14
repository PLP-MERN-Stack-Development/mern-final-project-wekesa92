const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const controller = require('../controllers/taskController');

router.use(protect);
router.post('/', controller.createTask);
router.get('/board/:boardId', controller.getTasksByBoard);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
