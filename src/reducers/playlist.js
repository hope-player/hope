import { Map, List } from 'immutable';

const defaultState = new Map({
  playlist: new List(),
  active: -1,
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PLAY_SUCCEEDED':
      return state.set('active', action.index);
    case 'ADD_TO_PLAYLIST':
      return state.update('playlist', playlist => playlist.push(action.track));
    default:
      return state;
  }
}
