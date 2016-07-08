import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box } from 'reflexbox';
import 'normalize.css';

import LibraryView from '../components/LibraryView';
import lVState from '../state/LibraryViewState';
import Api from '../api/api';

import '../styles/main.css';

@observer export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.api.initLibrary();
  }
  render() {
    return (
      <Flex className={"fill-height"} align={'stretch'}>
        <Box className="fill-height" px={2} auto>
          <LibraryView
            root={lVState.root}
            toggle={lVState.toggle}
            isExpanded={lVState.isExpanded}
          />
        </Box>
        <Box px={2} auto />
        <Box px={2} auto />
      </Flex>
    );
  }
}
