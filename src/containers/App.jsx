import React from 'react';
import { observer } from 'mobx-react';
import { LibraryView } from '../components/LibraryView';
import { LibraryState } from '../state/LibraryState';

@observer export class App extends React.Component {
  render() : React.Component {
    return <LibraryView library={LibraryState} />;
  }
}
