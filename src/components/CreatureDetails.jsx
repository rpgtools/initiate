import React from 'react';
import { connect } from 'react-redux';
import Counter from './Initiative/Counter';
import Button from './ui/Button';
import * as creatureActions from '../actions/creatures';
import { selectedCreatureSelector } from './selectors';

class CreatureDetails extends React.Component {
  state = {
    isAddingNewCounter: false
  };

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
    const { creature } = this.props;
    return (
      <div className="widget creature-details">
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
      </div>
    );
  };
};

const mapStateToProps = state => ({
  creature: selectedCreatureSelector(state),
});

const mapDispatchToProps = {
  deleteCreature: creatureActions.deleteCreature,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureDetails);
