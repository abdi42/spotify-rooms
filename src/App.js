import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ListGroup, ListGroupItem, Badge,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,Container, Row, Col,Media  } from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'
import Spotify from 'spotify-web-api-js'
import Song from './Song.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      songs: [],
      start: Date.now(),
      currentSong:null,
      currentPosition: 0,
      percentage:0,
      collapsed: true
    }

    this.timer = null;
    this.spotify = new Spotify()
    this.spotify.setAccessToken('BQDePKBGvTEr8X7JLnVvbipS7OrYPSpltNiCbQ8HxU0UPQjyoenhpBsL6nh9wBw_vgfQRnXVDH-FEupEi8Nac2qfEuZyomni5IVD-5_aWMAuVsgbezTE8ki8NZwVkh1Q74AJb-TnTcjWYs3gj1102ZoHlIeAfVpilru4LlK5Yu5TMqsXKKwMwhY-Kpk2U68U35vyh72xNnLvvd8EG0SH_BSwEMcOhwD_BFpr6k0iK_Ia9pe5QLP5MWfQHHhxaupvMYjm6VXgBQ');
    this.upVoteSong = this.upVoteSong.bind(this)


  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount(){
    const tick = () => {
      this.setState({
        currentPosition: Date.now() - this.state.start + (0)
      });
    }


    this.timer = setInterval(tick, 300);



    this.spotify.getPlaylist('ook42', '37i9dQZF1DX1YF6nTEHymi').then(data => {
      var songs = data.tracks.items.map((song) => {
        return {
          votes:1,
          voted:false,
          spotify:song
        }
      })


      songs[7].votes = 2
      var songs = this.sortQue(songs)
      console.log(this.sortQue(songs))
      this.setState({songs,currentSong:songs[3].spotify.track})
      this.playSongs()
    });
  }

  playSongs(){
    var track = this.state.songs[0].spotify.track;


    this.spotify.play({
      context_uri:track.album.uri,
      offset:{
        position:track.track_number - 1
      }
    },(error,second) => {
      if(error == null) {
        this.setState({
          start:Date.now(),
          currentPosition:0
        })

        this.state.songs.shift()
        var songs = this.state.songs

        this.setState({currentSong:track,songs})
        setTimeout(() => {
          this.playSongs()
        },track.duration_ms - 1000 );
      }
    })
  }

  upVoteSong(index){
    var songs = this.state.songs;

    songs[index].voted = true;
    songs[index].votes +=1;

    this.setState({songs:this.sortQue(songs)})
    console.log(this.state.songs)
  }


  renderSongs(){
    return this.state.songs.map((song,index) => (
      <Song song={song} upVoteSong={this.upVoteSong} index={index} key={index}/>
    ));
  }

  sortQue(songs) {

    var minIdx, temp, len = songs.length;


    for(var i = 0; i < len; i++){
      minIdx = i;

      for(var j = i+1; j < len; j++){

         if(songs[j].votes > songs[minIdx].votes){
            minIdx = j;
         }
      }

      temp = songs[i];
      songs[i] = songs[minIdx];
      songs[minIdx] = temp;
    }

    return songs;

  }

  renderCurrentSong(){
    if(this.state.currentSong){
      const percentage = (this.state.currentPosition * 100 / this.state.currentSong.duration_ms).toFixed(2) + '%';

      let artists = this.state.currentSong.artists.map((artist) => {
        return artist.name
      })

      return (
        <ListGroup className="group sticky" >
          <ListGroupItem className="item-container">
            <Container>
              <Row>
                <Col xs="2" className="thumbnail current-thumbnail" >
                  <img src={this.state.currentSong.album.images[2].url} alt=""/>
                </Col>
                <Col xs="8">
                  <div className='song-container'>
                    <div className="song">
                      <p className="song-title">{this.state.currentSong.name}</p>
                      <p className="subdue">{this.state.currentSong.artists[0].name}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
          <div className="song-duration-background">
            <div className="song-duration" style={{ width: percentage }}>
            </div>
          </div>
        </ListGroup>
      )
    }
  }

  render() {
    return (
      <div className="app">
        <div>
          <Navbar id="header" className="fixed-top" color="faded" light>
            <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <ListGroup className="group songs-list" flush>
          { this.renderSongs() }
        </ListGroup>
        { this.renderCurrentSong() }
      </div>
    );
  }
}

export default App;
