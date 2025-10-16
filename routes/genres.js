const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');
const { requireAuth } = require('../middleware/auth');
const { validateGenre } = require('../middleware/validation');

router.get('/', genresController.getAllGenres);
router.get('/:id', genresController.getGenreById);
router.post('/', requireAuth, validateGenre, genresController.createGenre);
router.put('/:id', requireAuth, validateGenre, genresController.updateGenre);
router.delete('/:id', requireAuth, genresController.deleteGenre);

module.exports = router;
