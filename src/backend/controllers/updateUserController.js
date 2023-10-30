const User = require('../model/userModel');
const { checkStringIsEmpty } = require("../utils");

const updateUser = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            res.status(400).json({ error: "User not found!" });
        }

        const {email, phoneNumber, address, addressNumber} = req.body;

        if(checkStringIsEmpty(phoneNumber)  || checkStringIsEmpty(address) || checkStringIsEmpty(addressNumber)) {
            return res.status(400).json({ error:'All fields are mandatory' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({ message: "User updated" });
    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

module.exports = { updateUser }