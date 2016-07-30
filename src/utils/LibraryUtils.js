import Immutable from 'immutable';

export function libraryFromJS(js) {
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

export function librarySorter(a, b) {
  const aName = a.get('name');
  const bName = b.get('name');
  if (aName && bName) {
    return aName.localeCompare(bName);
  }
  return 0;
}
