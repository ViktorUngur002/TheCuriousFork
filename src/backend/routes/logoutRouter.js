const express = require('express');
const router = express.Router();
const authController = require('../controllers/logoutController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, authController.handleLogout);

module.exports = router;