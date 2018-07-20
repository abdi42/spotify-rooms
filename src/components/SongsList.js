import React, { Component } from 'react';
import Song from './Song.js'
import { ListGroup } from 'reactstrap'

const SongsList = props => {

  const renderSongs = () => {
    if(props.message && props.songs > 0) {
      return (
        <div className="Aligner">
          <div className="Aligner-item">
            <p>{props.message}</p>
          </div>
        </div>
      )
    }
    return props.songs.map((song,index) => (
      <Song song={song} { ...props}  index={index} key={index}/>
    ));
  }


  return (
    <ListGroup className="group songs-list" flush>
      { renderSongs() }
    </ListGroup>
  )
}


export default SongsList;
