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
