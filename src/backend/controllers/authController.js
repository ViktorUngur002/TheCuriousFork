const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const { checkStringIsEmpty } = require("../utils");
const jwt = require('jsonwebtoken');
const cookie = require("cookie");
const User = require('../model/userModel');

dotenv.config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if(checkStringIsEmpty(email) || checkStringIsEmpty(password) ) {
        return res.status(400).json({ error:'Email and password are required.' });
    }
        
    const foundUser = await User.findOne({ email });

    if(!foundUser) return res.status(401).json({ error: "Wrong email or password." });

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ error: "Wrong email or password." });
    } else {

        res.set(
            "Set-Cookie",
            cookie.serialize("token", generateToken(foundUser._id), {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 3600 * 24 * 30,
              path: "/",
            })
        );
      

        res.status(201).json({
            _id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            token: generateToken(foundUser._id),
            success: 'Login succed',
            isAuthenticated: true,
        })
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { handleLogin };