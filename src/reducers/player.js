import { Map } from 'immutable';

const defaultState = new Map();

export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
