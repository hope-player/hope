export function initLibrary() {
  return {
    type: 'LIBRARY_INIT_REQUESTED',
  };
}

export function requestSource(source) {
  return { type: 'SOURCE_FETCH_REQUESTED', source };
}

export function addToPlayList(id) {
  return { type: 'ADD_TO_PLAYLIST' };
}

export function toggle(id) {
  return { type: 'TOGGLE', id };
}
