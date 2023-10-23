const User = require('../model/userModel');

const handleGetMe = (async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
})

module.exports = { handleGetMe };