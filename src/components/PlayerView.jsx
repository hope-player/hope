import React from 'react';

import Player from './Player';

export default ({ currentTrack, playerState, stream, pause, resume,
    playNext, playPrevious }) =>
  <Player
    currentTrack={currentTrack}
    playerState={playerState}
    stream={stream}
    pause={pause}
    resume={resume}
    playNext={playNext}
    playPrevious={playPrevious}
  />;
