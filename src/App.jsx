import React, {Component} from 'react';
import { connect } from 'react-redux';

import Initiative from './components/Initiative';
import CreatureDetails from './components/CreatureDetails';
import InitiativeButtonsWidget from './components/Initiative/InitiativeButtons';
import { userSelector } from './selectors';
import './styles/index.scss';

class App extends Component {
  componentDidMount() {

  }
  render () {
    if (document.cookie === '') { console.log('EMPTY')}
    return (
      <div>
        {document.cookie === this.props.user.token ? (
          <main className="main">
            <Initiative />
            <div className="temporary-right-side">
              <InitiativeButtonsWidget />
              <CreatureDetails />
              <button onClick={() => { document.cookie = 'token=;'; this.forceUpdate()}}> LOGOUT</button>
            </div>
          </main>
        ) : (
          <main className="main">
            <a href={'http://localhost:3001/auth/google'}>LOGIN </a>
            <button onClick={this.props.getUser}>Set user in redux</button>
          </main>
          )
        }
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getUser: () => dispatch({ type: 'GET_USER' })
});

const mapState = state => ({
  user: userSelector(state),
});

export default connect(mapState, mapDispatch)(App);
