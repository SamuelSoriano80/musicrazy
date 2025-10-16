function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // Guests can only make GET requests
    if (!req.isAuthenticated()) {
      if (req.method !== 'GET') {
        return res.status(403).json({ error: 'Guests can only perform GET requests' });
      }
      return next();
    }

    // Authenticated users
    const userRole = req.user.role;

    // Admins can do anything
    if (userRole === 'admin') return next();

    // Clients can only modify playlists, but GET everything
    if (userRole === 'client') {
      if (req.method === 'GET') return next();

      if (req.originalUrl.includes('/playlists')) return next();

      return res.status(403).json({ error: 'Clients can only modify playlists' });
    }

    // Any other case
    res.status(403).json({ error: 'Access denied' });
  };
}

module.exports = { requireRole };