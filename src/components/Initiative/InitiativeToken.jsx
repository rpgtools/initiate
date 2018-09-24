import React from 'react';
import { DragHandle } from '../reusable/SortableList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSort } from '@fortawesome/free-solid-svg-icons'
import ReactModal from 'react-modal';
import Counter from './Counter';
import CreateCounterButton from './CreateCounterButton';
import CreatureForm from '../CreatureForm';

export default class InitiativeToken extends React.Component {
  state = {
    showEditModal: false,
  };

  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleCreateCounter = ({ label }) =>
    this.props.createCounter(this.props.creature.id, label);

  handleUpdateCreature = creature =>
    this.props.updateCreature({ ...this.props.creature, ...creature });

  toggleShowEditModal = () =>
    this.setState({ showEditModal: !this.state.showEditModal });

  getPortalRoot = () => document.getElementById("portal-root");

  render() {
    const { creature } = this.props;
    return (
      <div className="initiative-token">
        <div className="initiative-token__title">
          {creature.name}
        </div>
        <div className="initiative-token__counters">
          <CreateCounterButton onSubmit={this.handleCreateCounter}/>
          {creature.counters.map((counter, index) =>
            <Counter
              onUpdateCounter={this.handleUpdateCounter(index)}
              counter={counter}
              key={index}
            />
            )
          }
        </div>
        <div className="initiative-token__actions">
          <button className="initiative-token__edit" tabIndex="-1" onClick={this.toggleShowEditModal}>
            <FontAwesomeIcon className="icon" icon={faEdit} />
          </button>
          <DragHandle><FontAwesomeIcon icon={faSort} /></DragHandle>
        </div>
        <ReactModal
          isOpen={this.state.showEditModal}
          parentSelector={this.getPortalRoot}
          onRequestClose={this.toggleShowEditModal}
        >
          <CreatureForm
            closeModal={this.toggleShowEditModal}
            creatureId={creature.id}
          />
        </ReactModal>
      </div>
    );
  }
};
