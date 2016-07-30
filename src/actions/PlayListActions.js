export function play(source, id, index) {
  return {
    type: 'PLAY_REQUESTED',
    source,
    id,
    index,
  };
}


export function addToPlayList(track) {
  return {
    type: 'ADD_TO_PLAYLIST',
    track,
  };
}
