const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkStringIsEmpty } = require("../utils");
const User = require('../model/userModel');

dotenv.config();

const handleNewUser = async (req, res) => {
    const { name, email, password, confirmPassword, phoneNumber, birthdayDate, gender, address, addressNumber } = req.body;

    if(checkStringIsEmpty(name) || checkStringIsEmpty(email) || checkStringIsEmpty(password) || checkStringIsEmpty(confirmPassword) || checkStringIsEmpty(phoneNumber) || checkStringIsEmpty(birthdayDate) || checkStringIsEmpty(gender) || checkStringIsEmpty(address) || checkStringIsEmpty(addressNumber)) {
        return res.status(400).json({ error:'All fields are mandatory' });
    }

    if(password !== confirmPassword) {
        return res.status(400).json({ error:'Passwords must match' });
    }

    const duplicate = await User.findOne({email});

    if(duplicate) return res.status(400).json({ error: 'User already exists!' });

    try {

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword,
            phoneNumber,
            birthdayDate,
            gender,
            address,
            addressNumber
        });

        if(newUser) {
            res.status(200).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id),
                success: 'Registration successful'
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }

    } catch (err) {
        res.status(500).json({ error:err.message });
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { handleNewUser };