import React from 'react';

export default class Player extends React.Component {
  renderPlayer() {
    const { pause, resume, playNext, playPrevious, currentTrack } = this.props;
    if (currentTrack) {
      return (
        <div>
          <a onClick={pause}>pause</a>
          <a onClick={resume}>resume</a>
          <a onClick={playNext}>next</a>
          <a onClick={playPrevious}>prev</a>
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
        {playerState}
        {this.renderPlayer()}
      </div>
    );
  }
}
