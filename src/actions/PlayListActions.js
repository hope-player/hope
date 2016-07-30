export function play(track, index) {
  return {
    type: 'PLAY_REQUESTED',
    track,
    index,
  };
}

export function playRelative(offset) {
  return {
    type: 'PLAY_RELATIVE',
    offset,
  };
}


export function addToPlayList(track) {
  return {
    type: 'ADD_TO_PLAYLIST',
    track,
  };
}
