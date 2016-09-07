import React from 'react';


export default class PlayListViewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  play() {
    this.props.play(this.props.track, this.props.index);
  }

  render() : React.Element {
    const { track, active } = this.props;

    let className = 'playlist-view-item';
    if (active) {
      className = 'playlist-view-item active';
    }

    return (
      <tr key={`pl-item_${track.get('id')}`} className={className} onDoubleClick={this.play}>
        <td className="playlist-view-item-cell">{track.getIn(['metadata', 'title'])}</td>
        <td className="playlist-view-item-cell">{track.getIn(['metadata', 'artist'])}</td>
        <td className="playlist-view-item-cell">{track.getIn(['metadata', 'album'])}</td>
      </tr>
    );
  }
}
