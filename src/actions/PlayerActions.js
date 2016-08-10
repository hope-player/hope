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

export function durationChanged(duration) {
  return {
    type: 'DURATION_CHANGED',
    duration,
  };
}

export function timeChanged(time) {
  return {
    type: 'TIME_CHANGED',
    time,
  };
}
