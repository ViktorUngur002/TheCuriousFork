const express = require('express');
const router = express.Router();
const getMeController = require('../controllers/getMeController');
const { protect } = require('../middlewares/authMiddleware')

router.get('/me', protect,  getMeController.handleGetMe);

module.exports = router;