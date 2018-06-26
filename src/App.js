import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ListGroup, ListGroupItem, Badge} from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'
import FaMusic from 'react-icons/lib/fa/music'
import Spotify from 'spotify-web-api-js'
import Song from './Song.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      currentSong:null
    }
    this.spotify = new Spotify()
    this.spotify.setAccessToken('BQC2yMLlQ5Zhd3N1Gi_Oe4RuSNddq-0UqJAIjni-YN8-shqva-IYwbUVyO0zlT6c43gVxSLn4HYZ8Av1ejiX699wueJHbcH5_PrIFgsKkM-aSRwx50sMJnNmy6bLXBxlchhMPUg-q0rRATOCXY3vrWaHTvlkyfRdPZMYt6q9n9-bYU0opxawrplh5zuhDsIoSBqV3LN1fPocTmzk0GZQCAdVoiKENbqnMYx78yYUtT1rc_r2eWiyupNzAqRRv5no_mT34bX_WA');
    this.playSongs = this.playSongs.bind(this)
    this.upVote = this.upVote.bind(this)
  }

  componentDidMount(){
    this.spotify.getPlaylist('ook42', '37i9dQZF1DZ06evO1kxsTC').then(data => {
      var songs = data.tracks.items
      var songs = songs.map((spotifySong,index) => {
        var song = {}
        song.spotify = spotifySong
        song.votes = 0
        song.voted = false
        return song;
      })

      this.setState({songs})
      this.sortQue()
      this.playSongs()
    });

  }

  sortQue(){
    function sortVotes(a,b){
      return b.votes - a.votes
    }
    var a = this.state.songs;
    a.sort(sortVotes)
    var swapped;

    this.setState({songs:a})
  }

  playSongs(){
    this.setState({currentSong:this.state.songs[0]});
    var tempSongs = this.state.songs;
    tempSongs.shift()
    this.setState({songs:tempSongs})
    this.spotify.play({
      context_uri:this.state.currentSong.spotify.track.album.uri,
      offset:{
        position:this.state.currentSong.spotify.track.track_number - 1
      }
    },(error) => {
      if(error){
        alert("Could not play songs")
      } else {
        setTimeout(() => {
          this.playSongs()
        },10000,/*this.state.songs[0].spotify.track.duration_ms*/)
      }
    })
  }

  upVote(index){
    var temp = this.state.songs;

    if(temp[index].voted){
      temp[index].votes -= 1
    }
    else {
      temp[index].votes += 1
    }

    temp[index].voted = !temp[index].voted;
    this.setState({songs:temp})
    this.sortQue()
  }

  renderSongs(){
    return this.state.songs.map((song,index) => {
      return (
        <ListGroup key={index}>
          <Song track={song.spotify.track} voted={song.voted} index={index} upVoteClicked={this.upVote} />
        </ListGroup>
      )
    });
  }

  renderCurrentSong() {
    if(this.state.currentSong != null){
      return (
        <ListGroup className="group sticky">
          <ListGroupItem className="justify-content-between song-container">
            <div className="song current-song">
              <FaMusic className="icon subdue" style={{color:(this.props.voted != false) ? "#2ecc71 ": "#A4A5A5"}} />
              <p className="song-title">{this.state.currentSong.spotify.track.name}</p>
              <p className="subdue">{this.state.currentSong.spotify.track.artists[0].name}</p>
            </div>
          </ListGroupItem>
        </ListGroup>
      )
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderSongs()}
        {this.renderCurrentSong()}
      </div>
    );
  }
}

export default App;
