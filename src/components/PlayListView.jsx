import React from 'react';

import PlayListViewItem from './PlayListViewItem';

export default ({ playlist, play }) => {
  return (
    <div className={"playlist-view"}>
      {
        playlist.map((item, index) =>
          <PlayListViewItem track={item} play={play} index={index} />
        )
      }
    </div>
  );
};
