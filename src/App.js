import React, {Component} from 'react';
import {CreatureList, StateManagement} from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateManagement/>
        <CreatureList/>
      </div>
    );
  }
}

export default App;
