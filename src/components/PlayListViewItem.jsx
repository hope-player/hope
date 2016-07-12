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
    const { track } = this.props;
    return (
      <div
        className="playlist-item"
        key={`pl-item_${track.get('id')}`}
        onDoubleClick={this.play}
      >
        {track.get('artist')} - {track.get('album')} - {track.get('name')}
      </div>
    );
  }
}
