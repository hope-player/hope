import React from 'react';
import { observer } from 'mobx-react';

@observer export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPlayer() {
    const track = this.props.currentTrack;
    console.log(track);
    if (track) {
      return <div>{track.get('artist')} - {track.get('album')} - {track.get('name')}</div>
    } else {
      return null;
    }
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
