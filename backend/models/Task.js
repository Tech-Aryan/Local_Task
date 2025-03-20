const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  budget: { type: Number, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true }, // Added email field
  contactNo: { type: String, required: true }, // Added contactNo field
});

module.exports = mongoose.model('Task', taskSchema);
