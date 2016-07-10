// @flow
import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class LibraryViewState {
  @observable queue : Immutable.List;

  constructor() {
    this.toggle = this.toggle.bind(this);
    this.last_id = 0;
    this.expanded = new Immutable.Set([1]);
    this.root = new Immutable.Map({
      id: this.last_id,
      name: 'Library',
      type: 'root',
      children: new Immutable.Map(),
    });
  }

  @action toggle(id : number) {
    if (this.expanded.has(id)) {
      this.expanded = this.expanded.delete(id);
    } else {
      this.expanded = this.expanded.add(id);
    }
  }

  @computed get isExpanded() {
    return (id) => this.expanded.has(id);
  }

  @action addTrack(track) {
  }
}

const singleton = new LibraryViewState();
export default singleton;
