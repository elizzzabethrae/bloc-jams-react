
import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import Ionicons from 'react-ionicons';


class Album extends Component {
  constructor(props) {
    super(props);


    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  showIcons (song, index) { //does this just take whatever we need in the function?
    const isSameSong = this.state.currentSong === song; //is this needed?

    /*const showPause = this.state.isPlaying && isSameSong;
    const isHovered = this.state.isHovered === index + 1;
    const showPlay = (!this.state.isPlaying && isSameSong) || isHovered;

    if (showPause) {
      return <span className="ion-pause"><ion-icon name="pause"></ion-icon></span>
    } else if (showPlay) {
      return <span className="ion-play"><ion-icon name="play"></ion-icon></span>
    } else {
      return <span className="songNumber"> {index + 1} </span>
    }*/

    if (this.state.isPlaying && isSameSong) {
      return <span className="ion-pause"><ion-icon name="pause"></ion-icon></span>
    } else if (!this.state.isPlaying && isSameSong) {
      return <span className="ion-play"><ion-icon name="play"></ion-icon></span>
    } else if (this.state.isHovered === index + 1) {
      return <span className="ion-play"><ion-icon name="play"></ion-icon></span>
    } else {
      return <span className="songNumber"> {index + 1} </span>
    }
  }
    //  return index+1 //{<span className="songNumber"> {index + 1} </span>}


  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
        } else {
           if (!isSameSong) { this.setSong(song); }
          this.play();
        }
      }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody className= "songList">

            {this.state.album.songs.map( (song, index) => /*why this, "song" is never used in albums.js*/
              <tr className="song" key={index}
              onClick={() => this.handleSongClick(song)}
              onMouseEnter={(e) =>this.setState({isHovered: index + 1})}
              onMouseLeave={(e) => this.setState({isHovered: false})}
              >
                <td> {this.showIcons(song, index)} </td>
                <td className= "songTitle"> {song.title} </td>
                <td className= "songDuration"> {song.duration} </td>
              </tr>
              )
            }

          </tbody>
          </table>
          <PlayerBar isPlaying={this.state.isPlaying} currentSong={this.state.currentSong} />
      </section>
    );
  }
}



export default Album;
