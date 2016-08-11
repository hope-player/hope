import Immutable from 'immutable';
import storage from 'electron-json-storage';

import BeetsProvider from './beets';
import GMusicProvider from './gmusic';

const PROVIDERS = {
  beets: BeetsProvider,
  gmusic: GMusicProvider,
};

class Library {
  constructor() {
    this.providers = Immutable.Map();
    this.listeners = Immutable.Map();
    this.store = null;
    this.connect = this.connect.bind(this);
    this.init = this.init.bind(this);
    this.expand = this.expand.bind(this);
    this.getStream = this.getStream.bind(this);
  }

  connect(store) {
    this.store = store;
  }

  init() {
    storage.get('library', (err, library) => {
      library.providers.forEach(provider => {
        if (provider.enabled) {
          const newProvider = new PROVIDERS[provider.name](provider);
          newProvider.init(() => this.addProvider(provider.name, newProvider));
        }
      });
    });
  }

  addProvider(key, provider) {
    this.providers = this.providers.set(key, provider);
    if (this.store) {
      const providerNode = {
        id: key,
        name: key,
        type: 'source',
      };
      this.getAllArtists(key)
        .then((artists) => {
          this.store.dispatch({
            type: 'PROVIDER_ADDED',
            provider: providerNode,
            data: artists,
          });
        });
    }
  }

  expand(source, type, id) {
    switch (type) {
      case 'root':
        return this.getAvailableSources(id);
      case 'source':
        return this.getAllArtists(id);
      case 'artist':
        return this.getAllAlbumsByArtist(source, id);
      case 'album':
        return this.getAllTracksFromAlbum(source, id);
      default:
        return null;
    }
  }

  getAvailableSources() {
    return Immutable.List(this.providers.keys()).map(provider => {
      return {
        id: provider,
        name: provider,
        type: 'source',
      };
    });
  }

  getAllArtists(source) {
    return this.providers.get(source).getAllArtists();
  }

  getAllAlbumsByArtist(source, artist) {
    return this.providers.get(source).getAllAlbumsByArtist(artist);
  }

  getAllTracksFromAlbum(source, album) {
    return this.providers.get(source).getAllTracksFromAlbum(album);
  }

  getStream(source, id) {
    return this.providers.get(source).getStream(id);
  }
}

const singleton = new Library();
export default singleton;
