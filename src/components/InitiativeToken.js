import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Counter from '../components/Counter';
import Button from './Button';
import * as creatureActions from '../actions/creatures';

class InitiativeToken extends React.Component {

  handleCreateCounter = label => {
    this.props.createCounter(this.props.creature.id, label);
  };

  handleDeleteCounter = counterIndex => () => {
    this.props.deleteCounter(this.props.creature.id, counterIndex);
  };

  handleUpdateCounter = counterIndex => value => {
    this.props.updateCounter(this.props.creature.id, counterIndex, value);
  };

  render () {
    const { creature } = this.props;
    return (
      <div className="initiative-token">
        <h2 className="initiative-token_title">{creature.name}</h2>
        <div className="initiative-token_left">
          {creature.counters.map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              onUpdateValue={this.handleUpdateCounter(index)}
              onClickDelete={this.handleDeleteCounter(index)}
            />
          )}
        </div>
        <div className="initiative-token_right">
          <Button
            buttonLabel="New Counter"
            onSubmit={this.handleCreateCounter}
          />
          <Button
            buttonLabel="Edit Creature"
            onSubmit={console.log('EDIT CREATURE')}
          />
          <Button
           buttonLabel="Delete Creature"
           onSubmit={this.handleDeleteCounter}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(null, mapDispatchToProps)(InitiativeToken);
