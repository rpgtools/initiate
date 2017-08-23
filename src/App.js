import React, {Component} from 'react';
import GridLayout from './components/GridLayout';
import './App.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GridLayout />
      </div>
    );
  }
}

export default App;
