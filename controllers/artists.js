const Artist = require('../models/artist');

exports.getAllArtists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const artists = await Artist.find()
      .skip(skip)
      .limit(limit);

    const total = await Artist.countDocuments();

    res.json({
      artists,
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

exports.getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    next(err);
  }
};

exports.createArtist = async (req, res, next) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    next(err);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    next(err);
  }
};

exports.deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json({ message: 'Artist deleted successfully' });
  } catch (err) {
    next(err);
  }
};
