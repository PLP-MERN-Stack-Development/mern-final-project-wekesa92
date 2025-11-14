const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const controller = require('../controllers/commentController');

router.use(protect);
router.post('/', controller.createComment);
router.get('/task/:taskId', controller.getCommentsByTask);

module.exports = router;
