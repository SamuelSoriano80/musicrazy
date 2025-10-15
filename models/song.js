const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: String, trim: true },
  genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  releaseYear: { type: Number, min: 1900, max: new Date().getFullYear() },
  duration: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema, 'song');
