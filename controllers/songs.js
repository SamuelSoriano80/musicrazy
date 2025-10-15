const Song = require('../models/song');
const Artist = require('../models/artist');
const Genre = require('../models/genre');

exports.getAllSongs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const songs = await Song.find()
      .populate('artistId', 'name')
      .populate('genreId', 'name')
      .skip(skip)
      .limit(limit);

    const total = await Song.countDocuments();

    res.json({
      songs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate('artistId', 'name bio')
      .populate('genreId', 'name description');

    if (!song) return res.status(404).json({ error: 'Song not found' });

    res.json(song);
  } catch (error) {
    next(error);
  }
};

exports.createSong = async (req, res, next) => {
  try {
    const song = new Song(req.body);
    await song.save();
    await song.populate('artistId', 'name');
    await song.populate('genreId', 'name');
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('artistId', 'name')
     .populate('genreId', 'name');

    if (!song) return res.status(404).json({ error: 'Song not found' });

    res.json(song);
  } catch (error) {
    next(error);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    next(error);
  }
};
