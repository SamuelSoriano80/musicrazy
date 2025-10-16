const Playlist = require('../models/playlist');
const Song = require('../models/song');

exports.getAllPlaylists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const playlists = await Playlist.find()
      .populate('songIds', 'title artistId genreId')
      .populate('createdBy', 'username role')
      .skip(skip)
      .limit(limit);

    const total = await Playlist.countDocuments();

    res.json({
      playlists,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getPlaylistById = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('songIds', 'title artistId genreId')
      .populate('createdBy', 'username role');

    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    const playlistData = {
      ...req.body,
      createdBy: req.user._id
    };

    const playlist = new Playlist(playlistData);
    await playlist.save();

    await playlist.populate('createdBy', 'username role');

    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('songIds', 'title artistId genreId')
      .populate('createdBy', 'username role');

    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    next(err);
  }
};
