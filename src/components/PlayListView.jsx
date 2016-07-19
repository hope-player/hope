import React from 'react';

import PlayListViewItem from './PlayListViewItem';

export default ({ playlist, play, nowPlaying }) => {
  return (
    <div className={"playlist-view"}>
      {
        playlist.map((item, index) =>
          <PlayListViewItem
            track={item}
            play={play}
            active={nowPlaying === index}
            index={index}
            key={`pli_${index}`}
          />
        )
      }
    </div>
  );
};
