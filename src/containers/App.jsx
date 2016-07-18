import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'normalize.css';

import LibraryView from '../components/LibraryView';
import PlayListView from '../components/PlayListView';
import InfoView from '../components/InfoView';
import PlayerView from '../components/PlayerView';

import lVState from '../state/LibraryViewState';
import pState from '../state/PlayerState';

import '../api/api';

import '../styles/main.css';
import '../styles/icons.css';

@observer export default class App extends React.Component {
  render() {
    return (
      <Grid className="fill-screen">
        <Row className="app-bar">
          <h2>hope</h2> <i> (dev version)</i>
        </Row>
        <Row className="main">
          <Col md={3}>
            <LibraryView
              root={lVState.root}
              toggle={lVState.toggle}
              isExpanded={lVState.isExpanded}
              addToPlayList={pState.addToPlayList}
            />
          </Col>
          <Col md={6}>
            <PlayListView
              playlist={pState.playlist}
              updateNowPlaying={pState.updateNowPlaying}
              play={pState.play}
            />
          </Col>
          <Col md={3}>
            <InfoView currentTrack={pState.currentTrack} />
          </Col>
        </Row>
        <Row>
          <PlayerView
            playerState={pState.state}
            currentTrack={pState.currentTrack}
            stream={pState.stream}
            controls={pState.controls}
          />
        </Row>
      </Grid>
    );
  }
}
