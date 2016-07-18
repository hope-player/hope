import React from 'react';

import Player from './Player';

export default ({ currentTrack, playerState, stream, controls }) =>
  <Player
    currentTrack={currentTrack}
    playerState={playerState}
    stream={stream}
    controls={controls}
  />;
