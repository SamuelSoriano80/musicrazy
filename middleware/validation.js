const mongoose = require('mongoose');
const Song = require('../models/song');
const Artist = require('../models/artist');
const Genre = require('../models/genre');

// Validate Song
const validateSong = async (req, res, next) => {
  const { title, artistId, album, genreId, releaseYear, duration } = req.body;

  if (!title || !artistId || !genreId || !duration) {
    return res.status(400).json({ error: 'title, artistId, genreId, and duration are required' });
  }

  if (!mongoose.Types.ObjectId.isValid(artistId)) {
    return res.status(400).json({ error: 'Invalid artistId' });
  }

  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    return res.status(400).json({ error: 'Invalid genreId' });
  }

  const artistExists = await Artist.exists({ _id: artistId });
  const genreExists = await Genre.exists({ _id: genreId });

  if (!artistExists) {
    return res.status(400).json({ error: 'artistId does not exist' });
  }

  if (!genreExists) {
    return res.status(400).json({ error: 'genreId does not exist' });
  }

  if (duration <= 0 || typeof duration !== 'number') {
    return res.status(400).json({ error: 'duration must be a positive number' });
  }

  if (releaseYear && (releaseYear < 1000 || releaseYear > new Date().getFullYear())) {
    return res.status(400).json({ error: 'releaseYear is invalid' });
  }

  next();
};

// Validate Artist
const validateArtist = (req, res, next) => {
  const { name, bio, birthYear } = req.body;

  if (!name) return res.status(400).json({ error: 'name is required' });

  if (birthYear && (birthYear < 1000 || birthYear > new Date().getFullYear())) {
    return res.status(400).json({ error: 'birthYear is invalid' });
  }

  next();
};

// Validate Genre
const validateGenre = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  next();
};

// Validate Playlist
const validatePlaylist = async (req, res, next) => {
  const { name, songIds, description } = req.body;

  if (!name || !songIds) {
    return res.status(400).json({ error: 'name and songIds are required' });
  }

  if (!Array.isArray(songIds) || songIds.length === 0) {
    return res.status(400).json({ error: 'songIds must be a non-empty array' });
  }

  // Check that all IDs are valid Mongo ObjectIds
  for (const id of songIds) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid songId: ${id}` });
    }
  }

  // Check that all songIds exist in DB
  const existingSongs = await Song.find({ _id: { $in: songIds } }).select('_id');
  if (existingSongs.length !== songIds.length) {
    return res.status(400).json({ error: 'One or more songIds do not exist' });
  }

  next();
};

module.exports = { validateSong, validateArtist, validateGenre, validatePlaylist };