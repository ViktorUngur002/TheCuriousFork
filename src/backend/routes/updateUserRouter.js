const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/updateUserController');

router.put('/:id', updateUser);

module.exports = router;