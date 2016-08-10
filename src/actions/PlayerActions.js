export function pause() {
  return {
    type: 'PAUSE_REQUESTED',
  };
}

export function resume() {
  return {
    type: 'RESUME_REQUESTED',
  };
}

export function stateChanged(state) {
  return {
    type: 'STATE_CHANGE_REQUESTED',
    state,
  };
}
