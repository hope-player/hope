import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LibraryView from '../components/LibraryView';
import PlayListView from '../components/PlayListView';
import InfoView from '../components/InfoView';
import PlayerView from '../components/PlayerView';

import { toggle } from '../actions/LibraryActions';
import { addToPlayList, play, playRelative } from '../actions/PlayListActions';
import { pause, resume, timeChanged } from '../actions/PlayerActions';

import Player from '../media/mpv';

function App({
  library, playlist, player, toggle, addToPlayList,
  play, playNext, playPrevious, pause, resume, timeChanged,
}) {
  return (
    <div className="fill-screen">
      <div className="app-bar">
        <h2>hope</h2>
      </div>
      <div className="main">
        <div>
          <LibraryView
            root={library.get('sources')}
            toggle={toggle}
            addToPlayList={addToPlayList}
          />
        </div>
        <div>
          <PlayListView
            playlist={playlist.get('playlist')}
            active={playlist.get('active')}
            play={play}
          />
        </div>
        <div>
          <InfoView currentTrack={player.currentTrack} />
        </div>
      </div>
      <div>
        <PlayerView
          playerState={player.get('state')}
          currentTrack={player.get('currentTrack')}
          duration={player.get('duration')}
          pause={pause}
          resume={resume}
          playNext={playNext}
          playPrevious={playPrevious}
          time={player.get('time')}
          getTime={() => Player.getTime((time) => {
            timeChanged(time);
          })}
        />
      </div>
    </div>
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
    toggle: (node) => dispatch(toggle(node)),
    addToPlayList: (track) => dispatch(addToPlayList(track)),
    play: (source, id, index) => dispatch(play(source, id, index)),
    playNext: () => dispatch(playRelative(1)),
    playPrevious: () => dispatch(playRelative(-1)),
    pause: () => dispatch(pause()),
    resume: () => dispatch(resume()),
    timeChanged: (time) => dispatch(timeChanged(time)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
