const express = require('express');
const Task = require('../models/Task');
const router = express.Router(); // Initialize the router

// Route to create a new task
router.post('/create', async (req, res) => {
  const { title, description, location, budget, category, email, contactNo } = req.body;

  if (!email || !contactNo) {
    return res.status(400).json({ message: 'Email and Contact Number are required' });
  }

  const newTask = new Task({
    title,
    description,
    location,
    budget,
    category,
    email,
    contactNo,
  });

  try {
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error posting task', error: err.message });
  }
});

// Route to fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // Export the router
