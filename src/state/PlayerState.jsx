import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

import api from '../api/api';

class PlayListViewState {
  @observable playlist : Immutable.List;
  @observable nowPlaying : Number;
  @observable state : string;
  @observable ready : boolean;

  constructor() {
    this.play = this.play.bind(this);
    this.playlist = new Immutable.List();
    this.state = 'stopped';
    this.nowPlaying = -1;
    this.addToPlayList = this.addToPlayList.bind(this);
    this.controls = {
      pause: api.pause,
      resume: api.resume,
    };
  }

  @computed get currentTrack() {
    if (this.nowPlaying === -1) {
      return null;
    }
    return this.playlist.get(this.nowPlaying);
  }

  @computed get stream() {
    if (this.nowPlaying === -1) {
      return null;
    }
    const track = this.currentTrack;
    return `http://127.0.0.1:5000/media/stream/${track.get('source')}/${track.get('global_id')}`;
  }

  @action addToPlayList(track) {
    this.playlist = this.playlist.push(track);
  }

  @action play(index : number) {
    this.nowPlaying = index;
    this.state = 'playing';
    const track = this.playlist.get(index);
    api.play(track.get('source'), track.get('global_id'));
  }

  @action setReady(ready) {
    this.ready = ready;
  }
}

const singleton = new PlayListViewState();
export default singleton;
