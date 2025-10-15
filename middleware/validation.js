const validateSong = (req, res, next) => {
  const { title, artistId, genreId, duration } = req.body;
  
  if (!title || !artistId || !genreId || !duration) {
    return res.status(400).json({ 
      error: 'Title, artistId, genreId, and duration are required' 
    });
  }
  
  if (typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({ 
      error: 'Duration must be a positive number' 
    });
  }
  
  next();
};

const validateArtist = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  next();
};

module.exports = { validateSong, validateArtist };