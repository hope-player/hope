import { observable, action } from 'mobx';
import Immutable from 'immutable';

class PlayListViewState {
  @observable playlist : Immutable.List;

  constructor() {
    this.playlist = new Immutable.List();
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  @action addToPlayList(node) {
    this.playlist.push(node);
  }
}

const singleton = new PlayListViewState();
export default singleton;
