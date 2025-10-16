const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists');
const { requireAuth } = require('../middleware/auth');
const { validateArtist } = require('../middleware/validation');

router.get('/', artistsController.getAllArtists);
router.get('/:id', artistsController.getArtistById);
router.post('/', requireAuth, validateArtist, artistsController.createArtist);
router.put('/:id', requireAuth, validateArtist, artistsController.updateArtist);
router.delete('/:id', requireAuth, artistsController.deleteArtist);

module.exports = router;
