const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

const isAdmin = async (req, res, next) => {
  
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized, admin access required' });
  }
};

module.exports = { protect, isAdmin }