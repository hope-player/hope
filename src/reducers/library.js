import { Map, Set } from 'immutable';

import { libraryFromJS, librarySorter } from '../utils/LibraryUtils';

const defaultState = new Map({
  lastId: 0,
  expanded: new Set(),
  sources: new Map(),
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SOURCE_FETCH_SUCCEEDED':
      return state.withMutations(mutableState => {
        const lastId = mutableState.get('lastId') + 1;
        mutableState.set('lastId', lastId);
        mutableState.setIn(
          ['sources', action.source],
          new Map({
            name: action.source,
            id: `source_${lastId}`,
            metadata: {},
            children:
              libraryFromJS(action.library)
                .sort(librarySorter),
          })
        );
      });
    case 'TOGGLE':
      if (state.get('expanded').has(action.id)) {
        return state.update('expanded', expanded => expanded.delete(action.id));
      }
      return state.update('expanded', expanded => expanded.add(action.id));
    default:
      return state;
  }
}
