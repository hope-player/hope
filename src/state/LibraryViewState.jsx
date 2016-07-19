import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class LibraryViewState {
  @observable expanded : Immutable.Set;
  @observable root : Immutable.Map;
  @observable sources : Immutable.Map;
  last_id : number;

  constructor() {
    this.toggle = this.toggle.bind(this);
    this.last_id = 0;
    this.expanded = new Immutable.Set();
    this.sources = new Immutable.Map();
  }

  @action toggle(id : string) {
    if (this.expanded.has(id)) {
      this.expanded = this.expanded.delete(id);
    } else {
      this.expanded = this.expanded.add(id);
    }
  }

  @computed get isExpanded() {
    return (id) => this.expanded.has(id);
  }

  @action addSource(name, source) {
    this.sources = this.sources.set(name, new Immutable.Map({
      name,
      id: `source_${++this.last_id}`,
      metadata: {},
      children: Immutable.fromJS(source),
    }));
  }
}

const singleton = new LibraryViewState();
export default singleton;
