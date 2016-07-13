import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class PlayListViewState {
  @observable playlist : Immutable.List;
  @observable nowPlaying : Number;
  @observable state : string;

  constructor() {
    this.play = this.play.bind(this);
    this.playlist = new Immutable.List();
    this.state = 'stopped';
    this.nowPlaying = -1;
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  @computed get currentTrack() {
    if (this.nowPlaying === -1) {
      return null;
    }
    return this.playlist.get(this.nowPlaying);
  }

  @action addToPlayList(track) {
    this.playlist = this.playlist.push(track);
  }

  @action play(index : number) {
    this.nowPlaying = index;
    this.state = 'playing';
  }
}

const singleton = new PlayListViewState();
export default singleton;
