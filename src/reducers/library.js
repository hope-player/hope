import Immutable from 'immutable';

export const rootNode = Immutable.Map({
  name: 'root',
  type: 'root',
  localId: 0,
  id: 'root',
  path: [],
  source: 'none',
  expanded: false,
  metadata: Immutable.Map(),
  children: Immutable.OrderedMap(),
});

const defaultState = Immutable.Map({
  lastId: 0,
  sources: rootNode,
});

function updateLibrary(state, path, data) {
  return state.withMutations(mutableState => {
    let lastId = mutableState.get('lastId');
    mutableState.updateIn(
      ['sources'].concat(path),
      (node) => node.update(
        'children',
        (children) => children.withMutations(mutableChildren => {
          data.forEach(item => {
            mutableChildren.set(item.id, Immutable.Map({
              name: item.name,
              type: item.type,
              localId: ++lastId,
              id: item.id,
              path: node.get('path').concat(['children', item.id]),
              source: item.type === 'source' ? item.name : node.get('source'),
              expanded: false,
              metadata: Immutable.Map(item.metadata),
              children: Immutable.OrderedMap(),
            }));
          });
        })
      ).set('expanded', true)
    );
  });
}

export function library(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_SUCCEEDED':
      if (action.node.get('expanded')) {
        return state.updateIn(
          ['sources'].concat(action.node.get('path')),
          (node) => node
            .set('expanded', false)
        );
      }
      return updateLibrary(state, action.node.get('path'), action.data);
    case 'PROVIDER_ADDED':
      if (state.getIn(['sources', 'expanded'])) {
        return updateLibrary(state, [], [action.provider]);
      }
      return state;
    default:
      return state;
  }
}
