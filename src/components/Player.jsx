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
                return <a className="material-icons player-controls" onClick={resume}>play_circle_outline</a>;
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
    const { duration } = this.props;
    return (
      <div>
        {this.renderPlayer()}
        <div style={{ backgroundColor: 'white', height: '50px', width: `${100 * this.state.time / duration}%`, borderRight: '4px solid #CCC' }} />
      </div>
    );
  }
}
