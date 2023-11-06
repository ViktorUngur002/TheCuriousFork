const express = require('express');
const router = express.Router();
const { updateMeal } = require('../controllers/updateProductsController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')
const { uploadOptions } = require('../middlewares/uploadFilesMiddleware')

router.put('/:mealType/:id', protect, isAdmin, uploadOptions.single('image'), updateMeal);

module.exports = router;