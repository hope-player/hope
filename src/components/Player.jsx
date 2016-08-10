import React from 'react';

export default class Player extends React.Component {
  renderPlayer() {
    const { pause, resume, playNext, playPrevious, currentTrack, playerState } = this.props;
    if (currentTrack) {
      return (
        <div>
          <a className="material-icons player-controls" onClick={playPrevious}>skip_previous</a>
          {
            (() => {
              if (playerState === 'playing') {
                return <a className="material-icons player-controls" onClick={pause}>pause_circle_outline</a>;
              } else if (playerState === 'stopped' || playerState === 'paused') {
                return <a className="material-icons player-controls" onClick={resume}>play_circle_outline</a>
              }
              return <a className="material-icons player-controls">help_outline</a>;
            })()
          }
          <a className="material-icons player-controls" onClick={playNext}>skip_next</a>
          {currentTrack.get('name')}
        </div>
      );
    }
    return null;
  }

  render() : React.Element {
    const { playerState } = this.props;
    return (
      <div>
        {this.renderPlayer()}
      </div>
    );
  }
}
