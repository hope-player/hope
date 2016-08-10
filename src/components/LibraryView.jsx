import React from 'react';

import { LibraryViewItem } from './LibraryViewItem';

export default ({ root, toggle, addToPlayList }) =>
  <div className={"library-view"}>
    <LibraryViewItem
      node={root}
      toggle={toggle}
      addToPlayList={addToPlayList}
      key={'lvi_0'}
    />
  </div>;
