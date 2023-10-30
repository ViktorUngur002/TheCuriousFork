const User = require('../model/userModel');

const deleteUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            res.status(400).json({ error: "User not found!" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted!" });
    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

module.exports = { deleteUser }