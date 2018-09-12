import React from 'react';
import { connect } from 'react-redux';
import { makeGetCreatureSelector } from '../store/creatures/selectors';
import { actions as creatureActions } from  '../store/creatures';

class CreatureForm extends React.Component {
  // static
  state = {
    creature: this.props.creature || {
      name: '',
      counters: [
        { label: 'HP', value: 0 }
      ],
    }
  };

  handleUpdateCreatureForm = event => {
    const inputDataType = event.target.name;
    const inputValue = event.target.value;
    if (inputDataType === 'name') {
      this.setState({ creature: { ...this.state.creature, name: inputValue }});
    } else if (inputDataType === 'counter') {
      const counterIndex = event.target.dataset.indexNumber;
      const creature = this.state.creature;
      creature.counters[counterIndex].label = inputValue;
      this.setState({ creature });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const isExistingCreature = !!this.props.creature;
    isExistingCreature
      ? this.props.updateCreature(this.state.creature)
      : this.props.createCreature(this.state.creature);
    this.props.closeModal();
  }

  render() {
    const { creature } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={creature.name}
            onChange={this.handleUpdateCreatureForm}
          />
        </fieldset>
        <fieldset>
          {creature.counters.map((counter, index) =>
            <div key={index}>
              <label htmlFor={`counter-${index}`}></label>
              <input
                type="text"
                id={`counter-${index}`}
                name="counter"
                data-index-number={index}
                value={counter.label}
                onChange={this.handleUpdateCreatureForm}
              />
            <span>{counter.value}</span>
            </div>
          )}
        </fieldset>
        <button type="submit">SUBMIT</button>
      </form>
    );
  }
}

const mapState = (state, ownProps) =>
  ownProps.creatureId
    ? ({ creature: makeGetCreatureSelector(ownProps.creatureId)(state) })
    : null;

const mapDispatch = {
  createCreature: creatureActions.createCreature,
  createCounter: creatureActions.createCounter,
  updateCreature: creatureActions.updateCreature,
  updateCounter: creatureActions.updateCounter,
  deleteCreature: creatureActions.deleteCreature,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapState, mapDispatch)(CreatureForm);
