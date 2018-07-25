import React, {Component} from 'react';

import Initiative from './components/Initiative';
import StateManagement from './components/StateManagement';
import CreatureDetails from './components/CreatureDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateManagement />
        <Initiative />
        <CreatureDetails />
      </div>
    );
  }
}

export default App;
