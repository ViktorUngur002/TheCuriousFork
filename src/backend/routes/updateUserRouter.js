const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/updateUserController');
const { protect } = require('../middlewares/authMiddleware')

router.put('/:id', protect, updateUser);

module.exports = router;