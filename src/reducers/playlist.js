import { Map, List, Set } from 'immutable';

const defaultState = new Map({
  playlist: new List(),
  selected: new Set(),
  active: -1,
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PLAY_SUCCEEDED':
      return state.set('active', action.index);
    case 'ADD_TO_PLAYLIST_SUCCEEDED':
      return state.update('playlist', playlist => playlist.concat(action.tracks));
    case 'SELECT_FROM_PLAYLIST':
      return state;
    case 'UNSELECT_FROM_PLAYLIST':
      return state;
    default:
      return state;
  }
}
