import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box } from 'reflexbox';
import 'normalize.css';

import LibraryView from '../components/LibraryView';
import QueueView from '../components/QueueView';
import InfoView from '../components/InfoView';
import PlayerView from '../components/PlayerView';

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
      <Flex column>
        <Box className={"main"} auto>
          <Flex align={'stretch'}>
            <Box className="fill-height" auto>
              <LibraryView
                root={lVState.root}
                toggle={lVState.toggle}
                isExpanded={lVState.isExpanded}
              />
            </Box>
            <Box px={2} auto>
              <QueueView />
            </Box>
            <Box px={2} auto>
              <InfoView />
            </Box>
          </Flex>
        </Box>
        <Box auto>
          <PlayerView />
        </Box>
      </Flex>
    );
  }
}
