import lVState from '../state/LibraryViewState';

class Api {
  constructor() {
    this.root = 'http://127.0.0.1:5000';
  }
  initLibrary() {
    fetch(`${this.root}/available_sources`)
      .then(response => response.json())
      .then(sources => {
        sources.forEach(source => fetch(`${this.root}/library/${source}`)
          .then(response => response.json())
          .then(library => lVState.addSource(source, library)));
      });
  }

  addTrack(source, trackId, callback) {
    fetch(`${this.root}/media/add/${source}/${trackId}`)
      .then(response => callback(response));
  }
}

const singleton = new Api();
singleton.initLibrary();
export default singleton;
