const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs');
const { requireAuth } = require('../middleware/auth');
const { validateSong } = require('../middleware/validation');

router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getSongById);
router.post('/', requireAuth, validateSong, songsController.createSong);
router.put('/:id', requireAuth, validateSong, songsController.updateSong);
router.delete('/:id', requireAuth, songsController.deleteSong);

module.exports = router;