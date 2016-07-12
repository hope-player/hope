// @flow
import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';
import R from 'ramda';

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
    const newRoot = this.root.withMutations(root => {
      const children = new Immutable.Map().withMutations(mChildren => {
        for (const artist of R.values(source)) {
          mChildren.set(++this.last_id, new Immutable.Map({
            id: this.last_id,
            global_id: artist.artistID,
            type: 'artist',
            source: name,
            name: artist.name,
            children: new Immutable.Map().withMutations(mAlbums => {
              for (const album of R.values(artist.albums)) {
                mAlbums.set(++this.last_id, new Immutable.Map({
                  id: this.last_id,
                  global_id: album.albumID,
                  type: 'album',
                  source: name,
                  name: album.name,
                  artist: artist.name,
                  children: new Immutable.Map().withMutations(mTracks => {
                    for (const track of R.values(album.tracks)) {
                      mTracks.set(++this.last_id, new Immutable.Map({
                        id: this.last_id,
                        global_id: track.trackID,
                        type: 'track',
                        source: name,
                        name: track.title,
                        album: album.name,
                        artist: artist.name,
                        children: new Immutable.Map(),
                      }));  // SO MANY
                    }  // PARENTHESES
                  }),  // ARE
                }));  // TOO UGLY
              }  // FOR
            }),  // MY EYES
          }));
        }
      });

      root.setIn(['children', ++this.last_id], new Immutable.Map({
        id: this.last_id,
        name: name,
        type: 'source',
        children,
      }));
    });
    this.root = newRoot;
  }
}

const singleton = new LibraryViewState();
export default singleton;
