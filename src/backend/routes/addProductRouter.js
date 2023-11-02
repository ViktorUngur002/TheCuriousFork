const express = require('express');
const router = express.Router();
const { handleNewProduct } = require('../controllers/addProductsController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.post('/', protect, isAdmin, handleNewProduct);

module.exports = router;