import React from 'react';
import { observer } from 'mobx-react';

@observer export default class Player extends React.Component {
  renderPlayer() {
    const { currentTrack, ready, stream } = this.props;
    if (currentTrack && ready) {
      return (
        <audio controls>
          <source
            src={stream}
            type="audio/mpeg"
          />
        </audio>
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
