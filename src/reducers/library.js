import Immutable from 'immutable';

const defaultState = new Immutable.Map({
  lastId: 0,
  expanded: new Immutable.Set(),
  sources: new Immutable.Map(),
});

function libraryFromJS(js) {
  if (typeof js !== 'object' || js === null) {
    return js;
  } else if (Array.isArray(js)) {
    return Immutable.Seq(js).map(libraryFromJS).toList();
  } else if ('type' in js && js.type === 'album') {
    const result = Immutable
      .Seq(js)
      .map(libraryFromJS)
      .toMap()
      .update(
        'children',
        children =>
          children.sort(
            (a, b) => {
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
  return Immutable.Seq(js).map(libraryFromJS).toMap();
}

function librarySorter(a, b) {
  const aName = a.get('name');
  const bName = b.get('name');
  if (aName && bName) {
    return aName.localeCompare(bName);
  }
  return 0;
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SOURCE_FETCH_SUCCEEDED':
      return state.withMutations(mutableState => {
        const lastId = mutableState.get('lastId') + 1;
        mutableState.set('lastId', lastId);
        mutableState.setIn(
          ['sources', action.source],
          new Immutable.Map({
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
