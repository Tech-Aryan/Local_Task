// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, name, email, password, role, skills, availability, location } = req.body;

  try {
    // Check if the role is valid
    if (!['Seeker', 'Helper'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      availability,
      location,
    });

    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
});

module.exports = router;
