import { observable, action, autorun } from 'mobx';
import Immutable from 'immutable';

class LibraryState {
  @observable root;
  last_id;

  constructor() {
    this.last_id = 1;
    this.root = new Immutable.Map({
      id: this.last_id++,
      name: 'Library root',
      type: 'root',
      children: new Immutable.Map({ test: new Immutable.Map({
        id: this.last_id++,
        name: 'Test',
        type: 'source',
        children: new Immutable.Map(),
      }) }),
    });
    autorun(() => {
      console.log(this.last_id);
      console.log(this.root);
    });
  }

  @action addSource(source) {
    const newRoot = this.root.withMutations(root => {
      const children = new Immutable.Map().withMutations(mChildren => {
        for (let artist of source) {
          mChildren.set(artist.name, new Immutable.Map({
            id: this.last_id++,
            type: 'artist',
            name: artist.name,
            children: new Immutable.Map(),
          }));
        }
      });

      root.setIn(['children', 'source'], new Immutable.Map({
        id: this.last_id++,
        name: 'source',
        type: 'source',
        children,
      }));
    });
    this.root = newRoot;
  }
}

const singleton = new LibraryState();
export default singleton;
