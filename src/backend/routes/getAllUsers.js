const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const { protect, isAdmin } = require('../middlewares/authMiddleware')

router.get('/getUsers/:id', protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const userId = req.params.id;

        const usersExceptRequestedUser = users.filter(user => user._id.toString() !== userId);

        if(usersExceptRequestedUser) {
            res.status(200).json(usersExceptRequestedUser);
        } else {
            res.status(400).json({ message: 'No data found!' });
        }

    } catch(error) {
        res.status(500).json({ error:error });
    }
})

module.exports = router;