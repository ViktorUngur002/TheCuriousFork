const express = require('express');
const router = express.Router();
const { deleteUser } = require('../controllers/deleteUserController');

router.delete('/:id', deleteUser);

module.exports = router;