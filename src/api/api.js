import axios from 'axios';
import lVState from '../state/LibraryViewState';

class Api {
  constructor() {
    this.root = 'http://127.0.0.1:8080';
    this.wsConnection = new WebSocket('ws://127.0.0.1:8080/ws');
    this.wsConnection.onmessage = this.handleMessage;
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  handleMessage(message) {
    console.log(message);
  }

  initLibrary() {
    axios.get(`${this.root}/available_sources`)
      .then(sources => {
        sources.data.forEach(source => {
          axios.get(`${this.root}/library/${source}`)
            .then(library => lVState.addSource(source, library.data));
        });
      })
      .catch(error => { console.log(error); }); // TODO: error handling
  }

  play(source, trackId) {
    this.wsConnection.send(JSON.stringify({
      method: 'play',
      params: [source, trackId],
    }));
  }

  pause() {
    this.wsConnection.send(JSON.stringify({
      method: 'pause',
    }));
  }

  resume() {
    this.wsConnection.send(JSON.stringify({
      method: 'resume',
    }));
  }


  addTrack(source, trackId, callback) {
    fetch(`${this.root}/media/add/${source}/${trackId}`)
      .then(response => callback(response));
  }
}

const singleton = new Api();
singleton.initLibrary();
export default singleton;
