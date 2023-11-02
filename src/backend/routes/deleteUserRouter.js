const express = require('express');
const router = express.Router();
const { deleteUser } = require('../controllers/deleteUserController');
const { protect } = require('../middlewares/authMiddleware')

router.delete('/:id', protect, deleteUser);

module.exports = router;