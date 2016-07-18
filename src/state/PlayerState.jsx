import { observable, action, computed, autorun } from 'mobx';
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
      next: () => this.play(this.nextItemIndex),
      previous: () => this.play(this.prevItemIndex),
    };
    api.addListener('state_changed', data => {
      const newState = data[1];
      console.log(newState);
      if (newState === 2) {
        this.state = 'stopped';
      } else if (newState === 3) {
        this.state = 'paused';
      } else if (newState === 4) {
        this.state = 'playing';
      }
    });
    api.addListener('eos', () => {
      this.play(this.nextItemIndex);
    });
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
    const track = this.playlist.get(index);
    api.play(track.get('source'), track.get('global_id'));
  }

  @action setReady(ready) {
    this.ready = ready;
  }

  @computed get nextItemIndex() {
    return this.nowPlaying + 1;
  }

  @computed get prevItemIndex() {
    return this.nowPlaying - 1;
  }
}

const singleton = new PlayListViewState();
export default singleton;
