const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const controller = require('../controllers/boardController');

router.use(protect);
router.post('/', controller.createBoard);
router.get('/', controller.getBoards);
router.get('/:id', controller.getBoard);
router.put('/:id', controller.updateBoard);
router.delete('/:id', controller.deleteBoard);

module.exports = router;
