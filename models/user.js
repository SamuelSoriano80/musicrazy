const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);