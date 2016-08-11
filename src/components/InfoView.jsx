import React from 'react';

export default ({ currentTrack }) =>
  <div className={"info-view"}>
    {currentTrack.get('name')}
  </div>;
