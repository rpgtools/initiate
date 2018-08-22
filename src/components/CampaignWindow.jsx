import React from 'react';
import { connect } from 'react-redux';
import Initiative from './Initiative';
import CreatureDetails from './CreatureDetails';
import InitiativeButtonsWidget from './Initiative/InitiativeButtons';
// import CreateCreatureForm from './CreateCreatureForm'
import { creaturesSelector } from './selectors';

class CampaignWindow extends React.Component {
  render () {
    const { creatures } = this.props;
    const initialized = (creatures.length);
    if(initialized) {
      return (
        <main className="main">
          <Initiative />
        </main>
      );
    } else {
      return (
        <main className="main">
          <Initiative />
        </main>
      )
    }
  }
}

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
});

export default connect(mapStateToProps, (_) => {})(CampaignWindow);
