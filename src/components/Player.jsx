import React from 'react';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    setInterval(() => { if (this.props.playerState === 'playing') this.setState({ time: this.state.time + 0.1 }); }, 100);
    setInterval(() => { this.props.getTime(); }, 1000);
    this.state = {
      time: 0,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ time: props.time });
  }

  renderPlayer() {
    const { pause, resume, playNext, playPrevious, playerState } = this.props;
    return (
      <div className="player-controls">
        <a className="material-icons player-control" onClick={playPrevious}>skip_previous</a>
        {
          (() => {
            if (playerState === 'playing') {
              return <a className="material-icons player-control" onClick={pause}>pause_circle_outline</a>;
            } else if (playerState === 'stopped' || playerState === 'paused') {
              return <a className="material-icons player-control" onClick={resume}>play_circle_outline</a>;
            }
            return <a className="material-icons player-control">help_outline</a>;
          })()
        }
        <a className="material-icons player-control" onClick={playNext}>skip_next</a>
      </div>
    );
  }

  render() : React.Element {
    const { duration } = this.props;
    return (
      <div className="player-view">
        {this.renderPlayer()}
        <div className="player-progress">
          <div
            className="player-progress-bar"
            style={{ width: `${100 * this.state.time / duration}%` }}
          ></div>
        </div>
      </div>
    );
  }
}
