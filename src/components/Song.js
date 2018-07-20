import React, { Component } from 'react';
import { ListGroupItem,Badge,Container, Row, Col,Media  } from 'reactstrap'
import FaSortUp from 'react-icons/lib/fa/chevron-up'

class App extends Component {
  constructor(props) {
    super(props)
    this.voteHandler = this.voteHandler.bind(this)
    this.addHandler = this.addHandler.bind(this)
  }

  voteHandler(){
    this.props.upVoteSong(this.props.index)
  }

  addHandler(){
    console.log("Hek")
    if(this.props.addSong)
      this.props.addSong(this.props.index)
  }

  renderBadge() {
    if(this.props.badge) {
      return (
        <Badge className="thumbnail-badge">{this.props.song.votes}</Badge>
      )
    }
  }

  renderVote(){
    if(this.props.upVoteSong){
      return (
        <Col xs="2">
          <div className="icon" onClick={this.voteHandler}>
            <FaSortUp className="icon subdue" style={{color:this.props.song.voted ? "#2ecc71":"#A4A5A5"}}/>
          </div>
        </Col>
      )
    }
  }

  render () {
    return (
      <ListGroupItem className="item-container">
        <Container onClick={this.addHandler}>
          <Row>
            <Col xs="2" className="thumbnail" >
              {this.renderBadge()}
              <img src={this.props.song.spotify.track.album.images[2].url} alt=""/>
            </Col>
            <Col xs="8">
              <div className='song-container'>
                <div className="song">
                  <p className="song-title">{this.props.song.spotify.track.name}</p>
                  <p className="subdue">{this.props.song.spotify.track.artists[0].name}</p>
                </div>
              </div>
            </Col>
            {this.renderVote()}
          </Row>
        </Container>
      </ListGroupItem>
    );
  }

}

// <p className="align-middle song-badge">
//   <Badge pill>{this.props.song.votes}</Badge>
// </p>


export default App;
