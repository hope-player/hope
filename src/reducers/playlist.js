
import { Map } from 'immutable';

const defaultState = new Map();

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PLAY':
      return state;
    default:
      return state;
  }
}
