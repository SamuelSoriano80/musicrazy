const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  bio: { type: String, trim: true },
  birthYear: { type: Number, min: 1000 }
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema, 'artist');
