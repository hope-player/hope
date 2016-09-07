import React from 'react';

import PlayListViewItem from './PlayListViewItem';

export default ({ playlist, play, active }) =>
  <div className="playlist-view">
    <table className="table table-hover table-inverse">
      <thead className="playlist-view-item playlist-view-header">
        <tr>
          <th className="playlist-view-item-cell">title</th>
          <th className="playlist-view-item-cell">artist</th>
          <th className="playlist-view-item-cell">album</th>
        </tr>
      </thead>
      <tbody className="playlist-view-body">
        {
          playlist.map((item, index) =>
            <PlayListViewItem
              track={item}
              play={play}
              active={active === index}
              index={index}
              key={`pli_${index}`}
            />
          )
        }
      </tbody>
    </table>
  </div>;
