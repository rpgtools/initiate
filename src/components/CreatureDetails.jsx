// Libs
import React from 'react';
import { connect } from 'react-redux';

// Child Components
import Counter from './Counter';
import Button from './Button';

import * as creatureActions from '../actions/creatures';
import { creaturesSelector, selectedCreatureSelector } from './Initiative/selectors';

class CreatureDetails extends React.Component {
  // TODO make functional component

  handleDeleteCreature = () => this.props.deleteCreature(this.props.creature.id)

  handleCreateCounter = label => this.props.createCounter(this.props.creature.id, label);

  handleDeleteCounter = counterIndex => () =>
    this.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.updateCounter(this.props.creature.id, counterIndex, value);

  handleCounterUpdate = counter => {
    this.props.onCounterUpdate({...counter, creatureId: this.props.creature.id});
  };

  handleCreateCreature = e => {
    e.preventDefault();
    this.props.submitCreateCreature(e.target.name.value);
  }
  render () {
    const { creature, isCreatingCreature, cancelCreateCreature } = this.props;
    if (creature || isCreatingCreature) {
      return (
        <div className="creature-details widget">

          {isCreatingCreature ? (
            <form onSubmit={this.handleCreateCreature}>
              <label>
                Name:
                <input type="text" name="name" autoFocus/>
              </label>
              <input type="submit" value="Submit" />
              <input type="submit" value="Cancel" onClick={cancelCreateCreature} />
            </form>
          ) : (
            <h2 className="creature-details__name">{creature.name}</h2>
          )}

          <div className="creature-details__counters">
            {creature && creature.counters.map((counter, index) =>
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
      );
    }
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
  creature: selectedCreatureSelector(state),
  isCreatingCreature: state.creatures.isCreating,
});

const mapDispatchToProps = {
  submitCreateCreature: creatureActions.submitCreateCreature,
  cancelCreateCreature: creatureActions.cancelCreateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureDetails);
