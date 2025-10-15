const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs');
// const { requireAuth } = require('../middleware/auth');
const { validateSong } = require('../middleware/validation');

router.get('/', songsController.getAllSongs);
router.get('/:id', songsController.getSongById);
router.post('/', validateSong, songsController.createSong);
router.put('/:id', validateSong, songsController.updateSong);
router.delete('/:id', songsController.deleteSong);

module.exports = router;