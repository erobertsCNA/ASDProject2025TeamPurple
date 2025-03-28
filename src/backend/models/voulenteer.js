const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  contactEmail: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);