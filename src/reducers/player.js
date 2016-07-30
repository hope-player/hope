import { Map } from 'immutable';

const defaultState = new Map({
  state: 'stopped',
  currentTrack: new Map(),
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'CURRENT_TRACK_UPDATE':
      return state.set('currentTrack', action.track);
    default:
      return state;
  }
}
