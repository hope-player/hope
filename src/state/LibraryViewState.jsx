// @flow
import { observable, computed, action } from 'mobx';
import Immutable from 'immutable';

class LibraryViewState {
  @observable expanded;

  constructor() {
    this.toggle = this.toggle.bind(this);
    this.expanded = new Immutable.Set(['1', '2', '3']);
  }

  @computed get isExpanded() : (id : string) => boolean {
    return (id : string) : boolean => this.expanded.has(id.toString());
  }

  @action toggle(id : string) {
    if (this.expanded.has(id)) {
      this.expanded = this.expanded.delete(id);
    } else {
      this.expanded = this.expanded.add(id);
    }
  }
}

const singleton = new LibraryViewState();
export default singleton;
