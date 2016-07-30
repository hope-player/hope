import React from 'react';

export default class Player extends React.Component {
  renderPlayer() {
    const { controls, currentTrack } = this.props;
    if (currentTrack) {
      return (
        <div>
          <a onClick={controls.pause}>pause</a>
          <a onClick={controls.resume}>resume</a>
          <a onClick={controls.next}>next</a>
          <a onClick={controls.previous}>prev</a>
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
