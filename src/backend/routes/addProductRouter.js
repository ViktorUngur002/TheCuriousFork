const express = require('express');
const router = express.Router();
const { handleNewProduct } = require('../controllers/addProductsController');
const { protect, isAdmin } = require('../middlewares/authMiddleware')
const { uploadOptions } = require('../middlewares/uploadFilesMiddleware')

router.post('/', protect, isAdmin, uploadOptions.single('image'), handleNewProduct);

module.exports = router;