import React from 'react';
import { DragHandle } from '../reusable/SortableList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import Counter from './Counter';
import CreateCounterButton from './CreateCounterButton';

export default class InitiativeToken extends React.Component {
  // handleDeleteCounter = counterIndex => (event) => {
  //   this.props.deleteCounter(this.props.creature.id, counterIndex);
  //   event.preventDefault();
  // }

  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleCreateCounter = ({ label }) =>
    this.props.createCounter(this.props.creature.id, label);

  handleClickDelete = event =>
    this.props.deleteCreature(this.props.creature.id);

  handleUpdateCreature = name =>
    this.props.updateCreature({ ...this.props.creature, name });

  handleClickEdit = () => window.alert('EDIT Creater')

  render() {
    const { creature } = this.props;
    const counters = creature.counters.map((counter, index) => {
      return(
        <Counter
          onUpdateCounter={this.handleUpdateCounter(index)}
          counter={counter}
          key={index}
        />
      );
    });
    return (
      <div className="initiative-token">
        <div className="initiative-token__title">
          {creature.name}
        </div>
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
