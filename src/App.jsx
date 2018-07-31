import React, {Component} from 'react';

import Initiative from './components/Initiative';
// import StateManagement from './components/StateManagement';
import CreatureDetails from './components/CreatureDetails';
import InitiativeButtonsWidget from './components/Initiative/InitiativeButtons';
import './styles/index.scss';

class App extends Component {
  render () {
    return (
      <div>
        <main className="main">
          {/*<StateManagement />*/}
          <Initiative />
          <InitiativeButtonsWidget />
          <CreatureDetails />
        </main>
      </div>
    );
  }
}

export default App;
