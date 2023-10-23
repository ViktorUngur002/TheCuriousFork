const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const protect = (async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({ error: 'Not authorized' });
        }
    }

    if(!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
});

const checkAuthentication = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        req.isAuthenticated = false;
        next();
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;
            req.isAuthenticated = true;
            next(); 
        } catch (error) {
            req.isAuthenticated = false;
            next();
        }
    }
}

module.exports = { protect, checkAuthentication }