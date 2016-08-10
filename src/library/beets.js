import BaseProvider from './base';

export default class BeetsProvider extends BaseProvider {
  constructor(config) {
    super(config.db);
  }

  getStream(track) {
    return new Promise((resolve, reject) => {
      try {
        this.db.get(
          'SELECT path FROM items WHERE id = ?',
          track,
          (err, row) => {
            resolve(`file://${row.path}`);
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}
