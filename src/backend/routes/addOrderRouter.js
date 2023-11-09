const express = require('express');
const router = express.Router();
const { handleNewOrder } = require('../controllers/addOrderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, handleNewOrder);

module.exports = router;