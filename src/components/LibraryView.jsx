import React from 'react';
import { observer } from 'mobx-react';

import { LibraryViewItem } from './LibraryViewItem';

export default (props) => observer(
  <LibraryViewItem
    node={props.library}
    toggle={props.toggle}
    isExpanded={props.isExpanded}
  />);
