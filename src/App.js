import React, {Component} from 'react';
import {CreatureList, StateManagement, WebFrame} from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateManagement/>
        <CreatureList/>
        <WebFrame/>
      </div>
    );
  }
}

export default App;
