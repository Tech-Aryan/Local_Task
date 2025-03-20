require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here'; // Use env variable for security

// Initialize app and server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

mongoose.connect('mongodb+srv://aryan:aryan%402004@cluster0.n5zgl.mongodb.net/taskPlatform?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((error) => console.error('❌ Error connecting to MongoDB:', error.message));



// User schema with role field
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  contact_no: String,
  role: { type: String, enum: ['seeker', 'helper'], required: true },
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  location: String,
  category: String,
  email: String,
  contactNo: String,
  seekerId: String,
  priority: { type: String, enum: ['Normal', 'Urgent'], default: 'Normal' },
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// ✅ Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, location, budget, category, email, contactNo, priority, seekerId } = req.body;

  if (!title || !description || !location || !budget || !category || !email || !contactNo || !seekerId) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newTask = new Task({ title, description, location, budget, category, email, contactNo, priority, seekerId });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// ✅ Fetch all tasks or filter by category
app.get('/api/tasks', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = category && category !== 'All' ? { category } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// ✅ User Signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password, contact_no, role } = req.body;

  if (!username || !email || !password || !contact_no || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, contact_no, role });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// ✅ User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// ✅ Admin Schema & Routes
const adminSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String });
const Admin = mongoose.model('Admin', adminSchema);

// ✅ Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@admin.com' && password === '12345') {
    return res.json({ message: 'Login successful' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// ✅ Admin: Get All Users
app.get('/api/admin/users', async (req, res) => {
  try {
    res.json(await User.find());
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// ✅ Admin: Get All Tasks
app.get('/api/admin/tasks', async (req, res) => {
  try {
    res.json(await Task.find());
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// ✅ Admin: Delete User
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// ✅ Admin: Delete Task
app.delete('/api/admin/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// ✅ Admin: Update User
app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Admin: Update Task
app.put('/api/admin/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
