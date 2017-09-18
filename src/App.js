import React, {Component} from 'react';
import {CreatureList, StateManagement, Timer} from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateManagement/>
        <CreatureList/>
        <Timer name="Lucifer"/>
      </div>
    );
  }
}

export default App;
