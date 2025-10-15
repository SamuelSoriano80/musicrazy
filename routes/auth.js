/*
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

function generateToken(user) {
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

module.exports = router;
*/