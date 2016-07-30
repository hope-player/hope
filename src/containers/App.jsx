import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import LibraryView from '../components/LibraryView';
import PlayListView from '../components/PlayListView';
import InfoView from '../components/InfoView';
import PlayerView from '../components/PlayerView';

import { toggle } from '../actions/LibraryActions';
import { addToPlayList, play, playRelative } from '../actions/PlayListActions';
import { pause, resume } from '../actions/PlayerActions';

import '../api/api';

import 'normalize.css';
import '../styles/main.css';
import '../styles/icons.css';

function App({
  library, playlist, player, toggle, addToPlayList,
  play, playNext, playPrevious, pause, resume,
}) {
  return (
    <Grid className="fill-screen">
      <Row className="app-bar">
        <h2>hope</h2> <i> (dev version)</i>
      </Row>
      <Row className="main">
        <Col md={3}>
          <LibraryView
            sources={library.get('sources')}
            toggle={toggle}
            isExpanded={(id) => library.get('expanded').has(id)}
            addToPlayList={addToPlayList}
          />
        </Col>
        <Col md={6}>
          <PlayListView
            playlist={playlist.get('playlist')}
            active={playlist.get('active')}
            play={play}
          />
        </Col>
        <Col md={3}>
          <InfoView currentTrack={player.currentTrack} />
        </Col>
      </Row>
      <Row>
        <PlayerView
          playerState={player.get('state')}
          currentTrack={player.get('currentTrack')}
          pause={pause}
          resume={resume}
          playNext={playNext}
          playPrevious={playPrevious}
        />
      </Row>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    library: state.library,
    playlist: state.playlist,
    player: state.player,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (id) => dispatch(toggle(id)),
    addToPlayList: (track) => dispatch(addToPlayList(track)),
    play: (source, id, index) => dispatch(play(source, id, index)),
    playNext: () => dispatch(playRelative(1)),
    playPrevious: () => dispatch(playRelative(-1)),
    pause: () => dispatch(pause()),
    resume: () => dispatch(resume()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
