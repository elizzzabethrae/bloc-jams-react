import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous">
            <span className="ion-skip-backward"><ion-icon name="skip-backward"></ion-icon></span>
          </button>
          <button id="play-pause">

            <span className={this.props.isPlaying ? "ion-pause" : "ion-play"}></span>
          </button>
          <button id="next">
            <span className="ion-skip-forward"><ion-icon name="skip-forward"></ion-icon></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">–:––</div>
          <input type="range" className="seek-bar" value="0" />
          <div className="total-time">–:––</div>
        </section>
        <section id="volume-control">
          <div className="icon ion-volume-low"></div>
          <input type="range" className="seek-bar" value="80" />
          <div className="icon ion-volume-high"></div>
        </section>
      </section>
    );
  }
}
      //why do we use ID in this section rather than class?
export default PlayerBar;
