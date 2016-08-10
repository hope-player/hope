import { Map } from 'immutable';

const defaultState = new Map({
  state: 'stopped',
  currentTrack: new Map(),
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'CURRENT_TRACK_UPDATED':
      return state.set('currentTrack', action.track);
    case 'STATE_CHANGE_SUCCEEDED':
      return state.set('state', action.state);
    default:
      return state;
  }
}
