import React from 'react';
import { observer } from 'mobx-react';

import LibraryView from '../components/LibraryView';
import { LibraryState } from '../state/LibraryState';
import lvstate from '../state/LibraryViewState';

export default () => observer(
  <LibraryView
    library={LibraryState}
    isExpanded={lvstate.isExpanded}
    toggle={lvstate.toggle}
  />);
