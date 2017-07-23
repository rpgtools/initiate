import React, { Component } from 'react';
import CreatureList from './components/CreatureList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreatureList />
      </div>
    );
  }
}

export default App;
