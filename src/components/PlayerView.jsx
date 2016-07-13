import React from 'react';

import Player from './Player';

export default ({ currentTrack, playerState, ready, stream }) =>
  <Player
    currentTrack={currentTrack}
    playerState={playerState}
    ready={ready}
    stream={stream}
  />;
