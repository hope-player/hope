import React from 'react';

import Player from './Player';

export default ({ currentTrack, playerState, stream, pause, resume,
    playNext, playPrevious, duration, time, getTime }) =>
  <Player
    currentTrack={currentTrack}
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
