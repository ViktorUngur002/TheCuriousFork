const express = require('express');
const router = express.Router();
const { deleteOrder } = require('../controllers/deleteOrderController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.delete('/:id', protect, isAdmin, deleteOrder);

module.exports = router;