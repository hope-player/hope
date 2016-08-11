import PlayMusic from 'playmusic';
import fs from 'fs';

import BaseProvider from './base';

export default class GMusicProvider extends BaseProvider {
  constructor(config) {
    super(config.db);
    this.name = 'gmusic';
    this.gpm = new PlayMusic();
    this.init = this.init.bind(this);
    this.config = config;
  }

  init(callback) {
    this.gpm.init(
      { masterToken: this.config.masterToken, androidId: this.config.androidId },
      () => {
        fs.stat(this.config.db, (fsError, stats) => {
          if (!stats.isFile() || stats.size <= 0) {
            this.gpm.getAllTracks({ limit: 20000 }, (gATErr, tracks) => {
              this.db.serialize(() => {
                this.db.run('BEGIN TRANSACTION');
                this.db.run(`
                  CREATE TABLE albums (
                    id TEXT PRIMARY KEY,
                    album TEXT,
                    albumartist TEXT,
                    year TEXT
                  )
                `);
                this.db.run(`
                  CREATE TABLE items (
                    _id TEXT PRIMARY KEY,
                    id TEXT,
                    track INTEGER,
                    title TEXT,
                    album TEXT,
                    artist TEXT,
                    year TEXT,
                    lyrics TEXT,
                    album_id TEXT,
                    FOREIGN KEY(album_id) REFERENCES album(id)
                  )
                `);
                const itemStatement = this.db.prepare(
                  'INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?)'
                );
                const albumStatement = this.db.prepare(
                  'INSERT OR IGNORE INTO albums VALUES (?, ?, ?, ?)'
                );
                tracks.data.items.forEach(track => {
                  let id = track.storeId;
                  if (id === null) {
                    id = track.id;
                  }
                  albumStatement.run(track.albumId, track.album, track.albumArtist, track.year);
                  itemStatement.run(track.id, id, track.trackNumber, track.title,
                    track.album, track.artist, track.year, track.albumId);
                });
                albumStatement.finalize();
                itemStatement.finalize();
                this.db.run('END');
              });
            });
          }
          callback();
        });
      }
    );
  }

  getStream(track) {
    return new Promise((resolve, reject) => {
      try {
        this.gpm.getStreamUrl(track, (err, stream) => { resolve(stream); });
      } catch (e) {
        reject(e);
      }
    });
  }

  update() {

  }
}
