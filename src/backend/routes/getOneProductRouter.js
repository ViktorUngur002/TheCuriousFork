const express = require('express');
const router = express.Router();
const getOneProduct = require('../controllers/getOneProductController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.get('/getOneProduct', protect, isAdmin, getOneProduct.handleGetOneProduct);

module.exports = router