import lVState from '../state/LibraryViewState';

export default class Api {
  initLibrary() {
    fetch('http://127.0.0.1:5000/available_sources')
      .then(response => response.json())
      .then(sources => {
        sources.forEach(source => fetch(`http://127.0.0.1:5000/library/${source}`)
          .then(response => response.json())
          .then(library => lVState.addSource(source, library)));
      });
  }
}
