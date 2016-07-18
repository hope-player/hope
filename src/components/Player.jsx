import React from 'react';
import { observer } from 'mobx-react';

@observer export default class Player extends React.Component {
  renderPlayer() {
    const { controls, currentTrack } = this.props;
    if (currentTrack) {
      return (
        <div>
          <a onClick={controls.pause}>pause</a>
          <a onClick={controls.resume}>resume</a>
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
