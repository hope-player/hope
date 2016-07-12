import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class PlayListViewState {
  @observable playlist : Immutable.List;
  @observable nowPlaying : number;
  @observable state : string;

  constructor() {
    this.playlist = new Immutable.List();
    this.string = 'stopped';
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  @computed get currentTrack() {
    return this.playlist.get(this.index);
  }

  @action addToPlayList(node) {
    this.playlist = this.playlist.push(node);
  }

  @action updateNowPlaying(index : number) {
    this.nowPlaying = index;
  }
}

const singleton = new PlayListViewState();
export default singleton;
