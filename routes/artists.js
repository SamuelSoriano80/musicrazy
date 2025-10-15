const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists');
//const { requireAuth } = require('../middleware/auth');
const { validateArtist } = require('../middleware/validation');

router.get('/', artistsController.getAllArtists);
router.get('/:id', artistsController.getArtistById);
router.post('/', validateArtist, artistsController.createArtist);
router.put('/:id', validateArtist, artistsController.updateArtist);
router.delete('/:id', artistsController.deleteArtist);

module.exports = router;
