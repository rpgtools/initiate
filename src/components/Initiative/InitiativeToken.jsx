import React from 'react';
import Counter from './Counter';
import CreateCounterButton from './CreateCounterButton';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';

export default class InitiativeToken extends React.Component {
  state = {
    isEditing: false,
  }
  handleDeleteCounter = counterIndex => () =>
    this.props.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleCreateCounter = ({ label }) =>
    this.props.createCounter(this.props.creature.id, label);

  handleClickEdit = event => {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  handleUpdateCreature = (event) =>
    this.props.updateCreature({...this.props.creature, name: event.target.value});

  render() {
    const {
      creature,
      actions,
    } = this.props;
    const { isEditing } = this.state;
    const counters = creature.counters.map((counter, index) => {
      return(
        <Counter
          onUpdateCounter={this.handleUpdateCounter(index)}
          onRequestDelete={this.handleDeleteCounter(index)}
          counter={counter}
          key={index}
          showDeleteButton={isEditing}
        />
      );
    });
    const creatureNameForm = (
      <form onSubmit={this.handleCreatureNameSubmit}>
        <input
          autoFocus
          type="text"
          value={creature.name}
          onChange={this.handleUpdateCreature}
          required
          />
      </form>
    );
    const tokenClass = classNames({
      'initiative-token': true,
      'initiative-token--editing': isEditing,
    });
    return (
      <div className={tokenClass}>
        <div className="initiative-token__title">{(isEditing) ? creatureNameForm : creature.name}</div>
        <div className="initiative-token__counters">
          <CreateCounterButton onSubmit={this.handleCreateCounter}/>
          {counters}
        </div>
        <div className="initiative-token__actions">
          <a onClick={this.handleClickEdit}>Edit</a>
          <DragHandle />
        </div>
      </div>
    );
  }
};
