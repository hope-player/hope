export function initLibrary() {
  return {
    type: 'LIBRARY_INIT',
  };
}

export function requestSource(source) {
  return { type: 'SOURCE_FETCH_REQUESTED', source };
}

export function toggle(node) {
  return { type: 'TOGGLE_REQUESTED', node };
}
