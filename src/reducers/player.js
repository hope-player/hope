import { Map } from 'immutable';

const defaultState = new Map({
  state: 'stopped',
  duration: 0.0,
  time: 0.0,
  currentTrack: new Map(),
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'CURRENT_TRACK_UPDATED':
      return state.set('currentTrack', action.track);
    case 'STATE_CHANGE_SUCCEEDED':
      return state.set('state', action.state);
    case 'DURATION_CHANGED':
      return state.set('duration', action.duration);
    case 'TIME_CHANGED':
      return state.set('time', action.time);
    default:
      return state;
  }
}
