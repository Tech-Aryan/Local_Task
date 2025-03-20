const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Changed 'name' to 'username'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact_no: { type: String, required: true },
  role: { type: String, required: true, enum: ['seeker', 'helper'] } // Added 'admin' role
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
