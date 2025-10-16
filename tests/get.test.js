const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

// Mock authentication middleware for testing
jest.mock('../middleware/auth', () => ({
  requireAuth: (req, res, next) => {
    req.isAuthenticated = () => true;
    req.user = { username: 'testuser', id: '12345' };
    next();
  }
}));

describe('MusicCrazy API', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  // SONGS
  describe('Songs', () => {
    let songId;

    it('GET /songs should return songs', async () => {
      const res = await request(app).get('/songs');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('songs');
      songId = res.body.songs[0]?._id;
    });

    it('POST /songs should create a song', async () => {
      const newSong = {
        title: 'Test Song',
        artistId: '68eff252176c82b5fd3d9957',
        genreId: '68eff252176c82b5fd3d9953',
        album: 'Test Album',
        releaseYear: 2025,
        duration: 180
      };
      const res = await request(app).post('/songs').send(newSong);
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(newSong.title);
      songId = res.body._id;
    });

    it('PUT /songs/:id should update a song', async () => {
      const res = await request(app)
        .put(`/songs/${songId}`)
        .send({ 
            title: "Updated Song",
            artistId: "68eff252176c82b5fd3d9957",
            album: "Updated Album",
            genreId: "68eff252176c82b5fd3d9953",
            releaseYear: 1976,
            duration: 360
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Song');
    });

    it('DELETE /songs/:id should delete a song', async () => {
      const res = await request(app).delete(`/songs/${songId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Song deleted successfully');
    });
  });

  // ARTISTS
  describe('Artists', () => {
    let artistId;

    it('GET /artists should return artists', async () => {
      const res = await request(app).get('/artists');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('artists');
      artistId = res.body.artists[0]?._id;
    });

    it('POST /artists should create an artist', async () => {
      const res = await request(app).post('/artists').send({
        name: 'Test Artist',
        bio: 'Test bio',
        birthYear: 2000
      });
      expect(res.statusCode).toBe(201);
      artistId = res.body._id;
    });

    it('PUT /artists/:id should update an artist', async () => {
      const res = await request(app)
        .put(`/artists/${artistId}`)
        .send({ name: 'Updated Artist' });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Artist');
    });

    it('DELETE /artists/:id should delete an artist', async () => {
      const res = await request(app).delete(`/artists/${artistId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Artist deleted successfully');
    });
  });

  // GENRES
  describe('Genres', () => {
    let genreId;

    it('GET /genres should return genres', async () => {
      const res = await request(app).get('/genres');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('genres');
      genreId = res.body.genres[0]?._id;
    });

    it('POST /genres should create a genre', async () => {
      const res = await request(app).post('/genres').send({
        name: 'Test Genre',
        description: 'Test description'
      });
      expect(res.statusCode).toBe(201);
      genreId = res.body._id;
    });

    it('PUT /genres/:id should update a genre', async () => {
      const res = await request(app)
        .put(`/genres/${genreId}`)
        .send({ name: 'Updated Genre' });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Genre');
    });

    it('DELETE /genres/:id should delete a genre', async () => {
      const res = await request(app).delete(`/genres/${genreId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Genre deleted successfully');
    });
  });

  // PLAYLISTS
  describe('Playlists', () => {
    let playlistId;

    it('GET /playlists should return playlists', async () => {
      const res = await request(app).get('/playlists');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('playlists');
      playlistId = res.body.playlists[0]?._id;
    });

    it('POST /playlists should create a playlist', async () => {
      const res = await request(app).post('/playlists').send({
        name: 'Test Playlist',
        description: 'Test description',
        songIds: ['68eff253176c82b5fd3d995e'],
      });
      expect(res.statusCode).toBe(201);
      playlistId = res.body._id;
    });

    it('PUT /playlists/:id should update a playlist', async () => {
      const res = await request(app)
        .put(`/playlists/${playlistId}`)
        .send({ 
            name: 'Updated Playlist',
            description: "Updated playlist description",
            songIds: [
                "68eff253176c82b5fd3d995f"
            ] 
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Updated Playlist');
    });

    it('DELETE /playlists/:id should delete a playlist', async () => {
      const res = await request(app).delete(`/playlists/${playlistId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Playlist deleted successfully');
    });
  });

});
