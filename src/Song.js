import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'

class App extends Component {
  constructor(props) {
    super(props)
  }

  votedHandler() {
    console.log("sd")
    this.props.upVoteClicked(this.props.index)
  }

  render () {
    return (
      <ListGroupItem className="justify-content-between song-container" >
        <FaSortUp className="icon subdue" style={{color:(this.props.voted != false) ? "#2ecc71 ": "#A4A5A5"}} onClick={this.votedHandler.bind(this)} />
        <div className="song">
          <p className="song-title">{this.props.track.name}</p>
          <p className="subdue">{this.props.track.artists[0].name}</p>
        </div>
      </ListGroupItem>
    );
  }

}

export default App;
