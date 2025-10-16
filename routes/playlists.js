const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlists');
const { requireAuth } = require('../middleware/auth');
const { validatePlaylist } = require('../middleware/validation');

router.get('/', playlistsController.getAllPlaylists);
router.get('/:id', playlistsController.getPlaylistById);
router.post('/', requireAuth, validatePlaylist, playlistsController.createPlaylist);
router.put('/:id', requireAuth, validatePlaylist, playlistsController.updatePlaylist);
router.delete('/:id', requireAuth, playlistsController.deletePlaylist);

module.exports = router;
