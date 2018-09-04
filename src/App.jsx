import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Initiative from './components/Initiative';
// import CreatureDetails from './components/CreatureDetails';
// import InitiativeButtonsWidget from './components/Initiative/InitiativeButtons';
// import { userSelector } from './services/api/auth/selectors';
import './styles/index.scss';

class App extends Component {
  componentDidMount() {
    //TODO: attempt login
  }
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

// const mapDispatch = dispatch => ({
//   getUser: () => dispatch({ type: 'GET_USER' }),
//   postCampaign: () => dispatch({ type: 'campaign/POST' }),
//
// });
//
// const mapState = state => ({
//   user: userSelector(state),
// });
//
// export default connect(mapState, mapDispatch)(App);
export default App;
