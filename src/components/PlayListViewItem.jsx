import React from 'react';
import { observer } from 'mobx-react';

@observer export default class PlayListViewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  play() {
    this.props.play(this.props.index);
  }

  render() : React.Element {
    const { track, active } = this.props;

    let className = 'playlist-item';
    if (active) {
      className = 'playlist-item active';
    }

    return (
      <div
        key={`pl-item_${track.get('id')}`}
        onDoubleClick={this.play}
        className={className}
      >
        {track.get('artist')} - {track.get('album')} - {track.get('name')}
      </div>
    );
  }
}
