const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  songIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', playlistSchema, 'playlist');
