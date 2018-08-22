import React from 'react';
import { connect } from 'react-redux';
import Initiative from './Initiative';
import CreatureDetails from './CreatureDetails';
import InitiativeButtonsWidget from './Initiative/InitiativeButtons';
// import CreateCreatureForm from './CreateCreatureForm'
import { creaturesSelector } from './selectors';

class CreateCreatureForm extends React.Component {
  constructor(props) {

  }

  render() {
    return(
      <form onSubmit={this.handleCreateCreature}>
        <label>
          Name:
          <input type="text" name="name" autoFocus />
        </label>
        <input type="submit" value="Submit" />
        <input type="button" value="Cancel" />
      </form>
    );
  }
};
