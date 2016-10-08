import React from 'react';

export default class PlayerView extends React.Component {
  propTypes = {
    getTime: React.PropTypes.func,
    pause: React.PropTypes.func,
    resume: React.PropTypes.func,
    playPrevious: React.PropTypes.func,
    playNext: React.PropTypes.func,
    playerState: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    setInterval(() => { this.props.getTime(); }, 500);
  }

  renderPlayer() {
    const { pause, resume, playNext, playPrevious, playerState } = this.props;
    return (
      <div className="player-controls">
        <a className="material-icons player-control" onClick={playPrevious}>skip_previous</a>
        {
          (() => {
            if (playerState === 'playing') {
              return (
                <a
                  className="material-icons player-control"
                  onClick={pause}
                >
                  pause_circle_outline
                </a>);
            } else if (playerState === 'stopped' || playerState === 'paused') {
              return (
                <a
                  className="material-icons player-control"
                  onClick={resume}
                >
                  play_circle_outline
                </a>);
            }
              return <a className="material-icons player-control">help_outline</a>;
          })()
        }
        <a className="material-icons player-control" onClick={playNext}>skip_next</a>
      </div>
    );
  }

  render() {
    const { duration, time } = this.props;
    const ratio = `${100 * time / duration}%`;
    return (
      <div className="player-view">
        {this.renderPlayer()}
        <div className="player-progress">
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="player-progress-bar"
          >
            <rect
              className="player-progress-bar-background"
              x="0" y="0"
              width={ratio} height="100%"
              fill="purple"
            />
            <rect
              className="player-progress-bar-slider"
              x={ratio} y="0"
              height="100%"
              width="5px"
              fill="blue"
            />
          </svg>
        </div>
      </div>
    );
  }
}
