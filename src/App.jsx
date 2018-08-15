import React, {Component} from 'react';
import { connect } from 'react-redux';

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
          <a href={'http://localhost:3001/auth/google'}>LOGIN </a>
          <a href={'http://localhost:3001/logout'}> LOGOUT</a>
          <button onClick={this.props.getUser}>Set user in redux</button>
          <Initiative />
          <div className="temporary-right-side">
            <InitiativeButtonsWidget />
            <CreatureDetails />
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getUser: () => dispatch({ type: 'GET_USER' })
});

export default connect(null, mapDispatch)(App);
