import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import QueueView from './containers/QueueView'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="app">
        <QueueView></QueueView>
      </div>
    );
  }
}

export default App;
