import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ListGroup, ListGroupItem, Badge} from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'
import Spotify from 'spotify-web-api-js'
import Song from './Song.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
    this.spotify = new Spotify()
    this.spotify.setAccessToken('BQANmpPhw1WL0F-gZ9WffF_Xu0J29sxC8qAwJHUALijgYtoR9AgZrwgBYyLpDOTdGUcLwUpjUsjxgo-AaxJrOhFGwY2fhWDVdKHAUYccsyfqDsrdm8XMBgTHU42Mon8ooPE5MT5tW-CTpx7V29u2PqiNJMob60I7XbZFRAlt5EOaTw0Myd9RFgHoQ78unwUbM4YSq7lSdEXD6hJFLVtGrsTf_LU63zzutdRWilC3pBqEIwV_vzAogXtHwzU1_IqjAB48V0_mcg');
    this.playSong = this.playSong.bind(this)
  }

  componentDidMount(){
    this.spotify.getPlaylist('ook42', '37i9dQZF1DZ06evO1kxsTC').then(data => {
      var songs = data.tracks.items
      this.setState({songs})
    });
  }

  playSong(uri,offset){
    this.spotify.play({
      context_uri:uri,
      offset:{
        position:offset
      }
    },(error) => {
    })
  }


  renderSongs(){
    return this.state.songs.map((song,index) => {
      return (
        <ListGroup className="group" key={index}>
          <Song track={song.track} playSong={this.playSong}/>
        </ListGroup>
      )
    });
  }

  render() {
    return (
      <div className="app">
        {this.renderSongs()}
        <ListGroup className="group sticky">
          <ListGroupItem className="justify-content-between song-container">
            <div className="song current-song">
              <p className="song-title">DNA</p>
              <p className="subdue">Kendrick Lamar</p>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default App;
