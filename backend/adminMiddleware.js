const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Import your user model

const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = decoded;  // Attach user info to request
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = authenticateAdmin;
