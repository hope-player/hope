import React from 'react';

export default ({ playlist }) => {
  return (
    <div className={"playlist-view"}>
      {
        playlist.map(item =>
          <div className="playlist-item" key={`pl-item_${item.get('id')}`}>
            {item.get('artist')} - {item.get('album')} - {item.get('name')}
          </div>
        )
      }
    </div>
  );
};
