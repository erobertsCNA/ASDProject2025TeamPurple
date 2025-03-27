const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
