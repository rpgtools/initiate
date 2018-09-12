import React from 'react';
import { connect } from 'react-redux';
import { makeGetCreatureSelector } from '../store/creatures/selectors';
import { actions as creatureActions } from  '../store/creatures';

class CreatureForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.creature) {
      this.state = { ...props.creature }
    } else {
      this.state =  {
        name: '',
        counters: [
          { label: 'HP', value: 0 }
        ],
      }
    }
  }

  addCounter = () => this.setState({
    counters: [ ...this.state.counters, { label: '', value: 0 } ]
  });

  removeCounter = index => () => this.setState({
    counters: this.state.counters.filter((_, i) => i !== index)
  });

  handleUpdateCreatureForm = event => {
    const inputType = event.target.name;
    const inputValue = event.target.value;
    if (inputType === 'counter') {
      const counterIndex = event.target.dataset.indexNumber;
      const counterKey = event.target.dataset.id;
      let counters = [ ...this.state.counters ];
      counters[counterIndex][counterKey] = inputValue;
      this.setState({ counters });
    } else {
      this.setState({ name: inputValue });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const isExistingCreature = !!this.props.creature;
    isExistingCreature
      ? this.props.updateCreature(this.state)
      : this.props.createCreature(this.state);
    this.props.closeModal();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleUpdateCreatureForm}
          />
        </fieldset>
        <button type="button" onClick={this.addCounter}>Add Counter</button>
        <fieldset>
          {this.state.counters.map((counter, index) =>
            <div key={index}>
              <input
                type="text"
                name="counter"
                data-id="label"
                data-index-number={index}
                value={counter.label}
                onChange={this.handleUpdateCreatureForm}
              />
              <input
                type="text"
                name="counter"
                data-id="value"
                data-index-number={index}
                value={counter.value}
                onChange={this.handleUpdateCreatureForm}
              />
            <button type="button" onClick={this.removeCounter(index)}>Remove Counter</button>
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
