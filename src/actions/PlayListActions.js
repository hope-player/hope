export function play(index) {
  return {
    type: 'PLAY',
  };
}


export function addToPlayList(track) {
  return {
    type: 'ADD_TO_PLAYLIST',
    track,
  };
}
