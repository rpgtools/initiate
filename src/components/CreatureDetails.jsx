import React from 'react';
import { connect } from 'react-redux';
import Counter from './Counter';
import Button from './reusable/Button';
import * as creatureActions from '../actions/creatures';
import { creaturesSelector, selectedCreatureSelector } from './Initiative/selectors';

class CreatureDetails extends React.Component {
  state = {
    isAddingNewCounter: false
  };

  handleCreateCreature = e => {
    e.preventDefault();
    this.props.submitCreateCreature(e.target.name.value);
  }

  handleDeleteCreature = () => this.props.deleteCreature(this.props.creature.id)

  handleCreateCounter = e => {
    this.props.createCounter(this.props.creature.id, e.target.counterName.value);
    this.toggleCounterForm();
  }

  handleUpdateCounter = counterIndex => value =>
  this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleDeleteCounter = counterIndex => () =>
    this.props.deleteCounter(this.props.creature.id, counterIndex);

  toggleCounterForm = () => {
    this.setState({ isAddingNewCounter: !this.state.isAddingNewCounter });
  }

  render () {
    const { creature, isCreatingCreature, cancelCreateCreature } = this.props;
    if (creature || isCreatingCreature) {
      return (
        <div className="widget creature-details">

          {isCreatingCreature ? (
            <form onSubmit={this.handleCreateCreature}>
              <label>
                Name:
                <input type="text" name="name" autoFocus/>
              </label>
              <input type="submit" value="Submit" />
              <input type="button" value="Cancel" onClick={cancelCreateCreature} />
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
                handleUpdateValue={this.handleUpdateCounter(index)}
                onClickDelete={this.handleDeleteCounter(index)}
                />
            )}
          </div>
          <div className="creature-details__buttons">
            {this.state.isAddingNewCounter ? (
              <form onSubmit={this.handleCreateCounter}>
                <label>
                  Counter name:
                  <input type="text" name="counterName" autoFocus />
                </label>
                <input type="submit" value="Submit" />
                <input type="button" value="Cancel" onClick={this.toggleCounterForm} />
              </form>
            ) : (
              <Button
                label="New Counter"
                onClick={this.toggleCounterForm}
                color="blue"
                />
            )}
            <Button
              onClick={this.handleDeleteCreature}
              label="Delete Creature"
              color="red"
            />
          </div>
          <p>Creature notes - coming soon!</p>
        </div>
      );
    } else {
      return (
        <div className="creature-details widget">
          <p>Create or select a creature to begin.</p>
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
