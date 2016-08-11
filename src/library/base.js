import sqlite3 from 'sqlite3';

export default class BaseProvider {
  constructor(path) {
    this.db = new sqlite3.Database(path);
    this.name = 'base';
  }

  init(callback) {
    callback();
  }

  getAllArtists() {
    return new Promise((resolve, reject) => {
      try {
        this.db.all(
          'SELECT DISTINCT albumartist from albums ORDER BY albumartist',
          (err, rows) => {
            resolve(rows.map(row => {
              return {
                id: row.albumartist,
                name: row.albumartist,
                source: this.name,
                type: 'artist',
              };
            }));
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllAlbumsByArtist(artist) {
    return new Promise((resolve, reject) => {
      try {
        this.db.all(
          'SELECT id, album from albums WHERE albumartist = ?',
          artist,
          (err, rows) => {
            resolve(rows.map(row => {
              return {
                id: row.id,
                name: row.album,
                type: 'album',
                source: this.name,
                metadata: { name: row.album, artist },
              };
            }));
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllTracksFromAlbum(album) {
    return new Promise((resolve, reject) => {
      try {
        this.db.all(
          'SELECT id, track, title, album, artist from items WHERE album_id = ? ORDER BY track',
          album,
          (err, rows) => {
            resolve(rows.map(row => {
              return {
                id: row.id,
                name: row.title,
                type: 'track',
                source: this.name,
                metadata: {
                  title: row.title,
                  album: row.album,
                  artist: row.artist,
                  no: row.track,
                },
              };
            }));
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  getStream(track) {
    return new Promise((resolve) => {
      resolve(track);
    });
  }

  update() {
    return;
  }
}
