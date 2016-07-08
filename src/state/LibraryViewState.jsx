// @flow
import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class LibraryViewState {
  @observable expanded : Immutable.Set;
  @observable root : Immutable.Map;
  last_id : number;

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

  @action addSource(source) {
    const newRoot = this.root.withMutations(root => {
      const children = new Immutable.Map().withMutations(mChildren => {
        for (const artist of source) {
          mChildren.set(++this.last_id, new Immutable.Map({
            id: this.last_id,
            type: 'artist',
            name: artist.name,
            children: new Immutable.Map().withMutations(mAlbums => {
              for (const album of artist.albums) {
                mAlbums.set(++this.last_id, new Immutable.Map({
                  id: this.last_id,
                  type: 'album',
                  name: album.name,
                  children: new Immutable.Map().withMutations(mTracks => {
                    for (const track of album.tracks) {
                      mTracks.set(++this.last_id, new Immutable.Map({
                        id: this.last_id,
                        type: 'track',
                        name: track.title,
                        children: new Immutable.Map(),
                      }));
                    }
                  }),
                }));
              }
            }),
          }));
        }
      });

      root.setIn(['children', ++this.last_id], new Immutable.Map({
        id: this.last_id,
        name: 'gmusic',
        type: 'source',
        children,
      }));
    });
    this.root = newRoot;
  }
}

const singleton = new LibraryViewState();
export default singleton;
