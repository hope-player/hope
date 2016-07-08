import lVState from '../state/LibraryViewState';

export default class Api {
  getLibrary() {
    console.log('fetching');
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(source => { lVState.addSource(source); });
  }
}
