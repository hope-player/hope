import React from 'react';

import Player from './Player';

export default ({ playerState, stream, pause, resume,
    playNext, playPrevious, duration, time, getTime }) =>
  <Player
    playerState={playerState}
    stream={stream}
    pause={pause}
    resume={resume}
    playNext={playNext}
    playPrevious={playPrevious}
    duration={duration}
    time={time}
    getTime={getTime}
  />;
