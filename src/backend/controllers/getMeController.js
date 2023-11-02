const User = require('../model/userModel');

const handleGetMe = (async (req, res) => {
    const {_id, name, isAdmin, email, phoneNumber, address, addressNumber} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        isAdmin,
        name,
        email,
        phoneNumber,
        address,
        addressNumber
    });
})

module.exports = { handleGetMe };