import React from 'react';

import { LibraryViewItem } from './LibraryViewItem';

export default ({ sources, toggle, isExpanded, addToPlayList }) =>
  <div className={"library-view"}>
    {
      sources.valueSeq().map(source =>
        <LibraryViewItem
          node={source}
          toggle={toggle}
          isExpanded={isExpanded}
          addToPlayList={addToPlayList}
          key={`lvi_${source.get('id')}`}
        />
      )
    }
  </div>;
