import { Map, List } from 'immutable';

const defaultState = new Map({
  playlist: new List(),
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PLAY':
      return state;
    case 'ADD_TO_PLAYLIST':
      return state.update('playlist', playlist => playlist.push(action.track));
    default:
      return state;
  }
}
