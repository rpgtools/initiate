import React from 'react';
import Counter from './Counter';
import CreateCounterButton from './CreateCounterButton';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'

export default class InitiativeToken extends React.Component {
  state = {
    isEditing: false,
  }
  handleDeleteCounter = counterIndex => (event) => {
    this.props.deleteCounter(this.props.creature.id, counterIndex);
    event.preventDefault();
  }
  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleCreateCounter = ({ label }) =>
    this.props.createCounter(this.props.creature.id, label);

  handleClickDelete = event =>
    this.props.deleteCreature(this.props.creature.id);

  handleClickEdit = event =>
    this.setState({ isEditing: !this.state.isEditing, });

  handleUpdateCreature = (event) =>
    this.props.updateCreature({...this.props.creature, name: event.target.value});

  render() {
    const {
      creature,
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
          <button className="initiative-token__edit" onClick={this.handleClickEdit}>
            <FontAwesomeIcon className="icon" icon={faEdit} />
          </button>
          <button className="initiative-token__delete" onClick={this.handleClickDelete}>
            <FontAwesomeIcon className="icon" icon={faTrashAlt} />
          </button>
          <DragHandle><FontAwesomeIcon icon={faArrowsAltV} /></DragHandle>
        </div>
      </div>
    );
  }
};
