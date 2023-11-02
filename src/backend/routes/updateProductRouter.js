const express = require('express');
const router = express.Router();
const { updateMeal } = require('../controllers/updateProductsController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.put('/:mealType/:id', protect, isAdmin, updateMeal);

module.exports = router;