import React, {Component} from 'react';

import Initiative from './components/Initiative';
import './styles/index.scss';

class App extends Component {
  render () {
    return (
      <div>
        <main className="main">
          <Initiative />
        </main>
      </div>
    );
  }
}

export default App;
