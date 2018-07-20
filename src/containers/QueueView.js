import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button,ListGroup,ListGroupItem,Container,Row,Col  } from 'reactstrap'
import SongsList from '../components/SongsList'
import Spotify from 'spotify-web-api-js'
import SearchView from './SearchView'

class QueueView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      start: Date.now(),
      currentSong:null,
      currentPosition: 0,
      percentage:0,
      route:'/search'
    }

    this.timer = null;
    this.spotify = new Spotify()
    this.spotify.setAccessToken('BQCEOW-UG37Av2-KWOX9B3Ffn0-GlnOmpmMiFEMhi-K88z1tBejXtgv76qxCoWjjWdZiMQjR1AVSY0YOvMba91CaUKOkHhcM64ULDg507DornU_RjMnRx1yAftPT4uFvZTyb2IMFLxg9TQSLky4_GbatkkREnsxvZaJngwgLv1A6-INuvx0WaS1xNSlJz1RI-QiF5vRUts_M1liTgDNWfHzWnHbzkD95EPpK7lHfF0965we00w8wAMKGHPI7Aejb09Rl1jdSlA');
    this.upVoteSong = this.upVoteSong.bind(this)
    this.playSongs = this.playSongs.bind(this)
    this.addSong = this.addSong.bind(this)
    this.showQueue = this.showQueue.bind(this)
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
  }

  showQueue() {
    this.setState({route:'/songs'})
  }

  upVoteSong(index){
    var songs = this.state.songs;
    if(!songs[index].voted){
      songs[index].voted = true;
      songs[index].votes +=1;

      this.setState({songs:this.sortQue(songs)})
    }
  }

  playSongs() {

    if(this.state.currentSong){
      return;
    }

    if(this.state.songs.length < 1)
      return;

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


        var songs = this.state.songs
        songs.shift()

        this.setState({currentSong:track,songs})

        setTimeout(() => {

          this.setState({currentSong:null})
          this.playSongs()

        },10000 * 3);
      }
    })
  }

  showSearch(){
    this.setState({route:'/search',query:'',querySongs:[]})
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
          <ListGroupItem className="item-container" style={{marginTop:0}}>
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

  addSong(selectedSong) {
    if(this.state.songs.length === 0){
      this.setState({route:'/songs',songs:[...this.state.songs,selectedSong]})
      this.playSongs()
    } else {
      this.setState({route:'/songs',songs:[...this.state.songs,selectedSong]})
    }
  }

  render() {
    if(this.state.route === "/songs") {
      return (
        <div>
          <div>
            <Navbar id="header" className="fixed-top" color="faded" light>
              <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
              <Button color="link" style={{color:'white'}} onClick={() => this.setState({route:'/search'})}>Add</Button>
            </Navbar>
          </div>
          <div>
            <SongsList songs={this.state.songs} upVoteSong={this.upVoteSong} badge="true" message="The queue is empty add. Add some songs!"></SongsList>
            { this.renderCurrentSong() }
          </div>
        </div>
      )
    } else {
      return (
        <SearchView addSong={this.addSong} spotify={this.spotify} songs={this.state.songs} showQueue={this.showQueue} ></SearchView>
      )
    }

  }
}

export default QueueView;
