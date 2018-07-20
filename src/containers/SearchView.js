import React, { Component } from 'react';
import SongsList from '../components/SongsList'
import { Navbar, NavbarBrand, Button, Input,InputGroup,InputGroupAddon } from 'reactstrap'
import FaChevronLeft from 'react-icons/lib/fa/chevron-left'

class SearchView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      querySongs:[],
      songs: [],
      query:'',
      typing: false,
      typingTimeout: 0,
      prev:null
    }

    this.searchTimer = null;
    this.handleChange = this.handleChange.bind(this)
    this.spotifySearch = this.spotifySearch.bind(this)
    this.addHandler = this.addHandler.bind(this)
  }


  spotifySearch (query) {
    // abort previous request, if any
    var prev = this.state.prev;

    if (prev !== null) {
      prev.abort();
    }

    // store the current promise in case we need to abort it
    prev = this.props.spotify.searchTracks(query, {limit: 10,type:'track'});
    this.setState({prev})
    prev.then((data) => {
      var songs = data.tracks.items.map((song) => {
        return {
          votes:1,
          voted:false,
          spotify:{
            track:song
          }
        }
      })
      console.log(songs)

      this.setState({prev:null,querySongs:songs})

    },(err) => {
      console.error(err);
    });
  }


  handleChange(event) {
    const self = this;

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeout);
    }

    self.setState({
       query: event.target.value,
       typing: false,
       typingTimeout: setTimeout(function () {
           self.spotifySearch(self.state.query);
         }, 500)
    });
  }

  triggerChange() {
      this.props.onChange(this.state.query);
  }


  showSearch(){
    this.setState({route:'/search',query:'',querySongs:[]})
  }


  addHandler(index){
    var songs = this.state.songs;
    var selectedSong = this.state.querySongs[index];
    setTimeout(() => {
      console.log
      this.props.addSong(selectedSong)
    },250)
  }



  render() {
    return (
      <div>
        <div>
          <Navbar id="header" className="fixed-top" color="faded" light>
            <InputGroup>
              <Input
                type="search"
                name="search"
                id="searchInput"
                placeholder="Add a song"
                style={{borderColor:'#fff'}}
                value={this.state.query}
                onChange={this.handleChange}/>
                <Button color="link" style={{paddingLeft:"6px",marginLeft:"5px",color:"white"}} onClick={this.props.showQueue}>Cancel</Button>
            </InputGroup>
          </Navbar>
        </div>
        <div>
          <SongsList songs={this.state.querySongs} addSong={this.addHandler}></SongsList>
        </div>
      </div>
    )
  }
}

export default SearchView;
