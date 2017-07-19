import React, { Component } from 'react';
import logo from './logo.svg';
import {Creature} from './components/Creature';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Creature counters={[{id: 1, count: 42, label: "hp"}]}/>
      </div>
    );
  }
}

export default App;
