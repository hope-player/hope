import React from 'react';

import { LibraryViewItem } from './LibraryViewItem';

export default ({ root, toggle, isExpanded, addToPlayList }) =>
  <div className={"library-view"}>
    <LibraryViewItem
      node={root}
      toggle={toggle}
      isExpanded={isExpanded}
      addToPlayList={addToPlayList}
    />
  </div>;
