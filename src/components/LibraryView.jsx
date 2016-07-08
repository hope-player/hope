import React from 'react';

import { LibraryViewItem } from './LibraryViewItem';
import '../styles/collapsable.css';

export default ({ root, toggle, isExpanded }) =>
  <div className={"library-view"}>
    <LibraryViewItem node={root} toggle={toggle} isExpanded={isExpanded} />
  </div>;
