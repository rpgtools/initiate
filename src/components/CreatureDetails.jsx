// Libs
import React from 'react';
import { connect } from 'react-redux';

// Child Components
import Counter from './Counter';
import Button from './Button';

import * as creatureActions from '../actions/creatures';
import { creaturesSelector, selectedCreatureSelector } from './Initiative/selectors';

class CreatureDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  };

  handleDeleteCreature = () => this.props.deleteCreature(this.props.creature.id)

  handleCreateCounter = label => this.props.createCounter(this.props.creature.id, label);

  handleDeleteCounter = counterIndex => () =>
    this.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.updateCounter(this.props.creature.id, counterIndex, value);

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  handleCounterUpdate = counter => {
    this.props.onCounterUpdate({...counter, creatureId: this.props.creature.id});
  };

  render () {
    const { creature } = this.props;
    if (creature) {
      return (
        <div className="creature-details widget">
          <h2 className="creature-details__name">{creature.name}</h2>
          <div className="creature-details__counters">
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
          <div className="creature-details__buttons">
            <Button
              buttonLabel="New Counter"
              onSubmit={this.handleCreateCounter}
              />
            <Button
              buttonLabel="Delete Creature"
              onSubmit={this.handleDeleteCreature}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className="creature-details widget">
          <p>Create a creature to begin.</p>
        </div>
      )
    }
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
  creature: selectedCreatureSelector(state),
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureDetails);
