const express = require('express');
const router = express.Router();
const { deleteMeal } = require('../controllers/deleteProductsController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.delete('/:mealType/:id', protect, isAdmin, deleteMeal);

module.exports = router;