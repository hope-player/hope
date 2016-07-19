import { observable, action, computed } from 'mobx';
import Immutable from 'immutable';

class LibraryViewState {
  @observable expanded : Immutable.Set;
  @observable root : Immutable.Map;
  @observable sources : Immutable.OrderedMap;
  last_id : number;

  constructor() {
    this.toggle = this.toggle.bind(this);
    this.last_id = 0;
    this.expanded = new Immutable.Set();
    this.sources = new Immutable.OrderedMap();
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
    function fromJS(js) {
      if (typeof js !== 'object' || js === null) {
        return js;
      } else if (Array.isArray(js)) {
        return Immutable.Seq(js).map(fromJS).toList();
      } else if ('type' in js && js.type === 'album') {
        const result = Immutable
              .Seq(js)
              .map(fromJS)
              .toMap()
              .update(
                'children',
                children =>
                  children.sort(
                    (a, b) =>  {
                      const aNo = a.getIn(['metadata', 'no']);
                      const bNo = b.getIn(['metadata', 'no']);
                      if (aNo > bNo) {
                        return 1;
                      } else if (aNo < bNo) {
                        return -1;
                      }
                      return 0;
                    }));
        return result;
      }
      return Immutable.Seq(js).map(fromJS).toMap();
    }

    this.sources = this.sources.set(
      name,
      new Immutable.Map({
        name,
        id: `source_${++this.last_id}`,
        metadata: {},
        children:
          fromJS(source)
          .sort(
            (a, b) => {
              const aName = a.get('name');
              const bName = b.get('name');
              if (aName && bName) {
                return aName.localeCompare(bName);
              }
              return 0;
            }
          ),
      })
    );
  }
}

const singleton = new LibraryViewState();
export default singleton;
