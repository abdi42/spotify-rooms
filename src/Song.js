import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'

class App extends Component {
  constructor(props) {
    super(props)
    this.playHandler = this.playHandler.bind(this)
  }

  playHandler(){
    this.props.playSong(this.props.track.album.uri,this.props.track.track_number - 1)
  }

  render () {
    return (
      <ListGroupItem className="justify-content-between song-container"  onClick={this.playHandler}>
        <FaSortUp className="icon subdue"/>
        <div className="song">
          <p className="song-title">{this.props.track.name}</p>
          <p className="subdue">{this.props.track.artists[0].name}</p>
        </div>
      </ListGroupItem>
    );
  }

}

export default App;
