import React from 'react';
import { connect } from 'react-redux';
import { actions as initiativeActions } from '../../store/initiative';
import { actions as modalActions } from '../../store/modals';
import { initiativeTurnSelector, initiativeRoundSelector } from '../../store/initiative/selectors';
import Button from '../reusable/Button';

class InitiativeControls extends React.Component {

  handleYes = () => {
    this.props.resetAll();
    this.props.closeModal();
  };

  handleNo = () => {
    this.props.resetTurn();
    this.props.closeModal();
  };

  openResetModal = () => {
    this.props.openModal('CustomModal', {
      content: (
        <div>
          Turns will be reset. Also clear all creatures?
          <div className="row">
            <Button color="blue" onClick={this.props.closeModal}>Cancel</Button>
            <Button color="yellow" onClick={this.handleNo}>No</Button>
            <Button color="red" onClick={this.handleYes}>Yes</Button>
          </div>
        </div>
      )
    });
  }

  render() {
    const { turn, round, nextTurn } = this.props;
    return (
      <div className='initiative-controls'>
        <Button
          className="initiative-controls__reset"
          label="Reset"
          onClick={this.openResetModal}
          color="red"
        />
        <p>Turn {turn} / Round {round}</p>
        <Button
          className="initiative-controls__next-turn"
          label="Next Turn"
          onClick={nextTurn}
          color="yellow"
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  turn: initiativeTurnSelector(state),
  round: initiativeRoundSelector(state)
});

const mapDispatchToProps = {
  closeModal: modalActions.closeModal,
  nextTurn: initiativeActions.nextTurn,
  openModal: modalActions.openModal,
  resetAll: initiativeActions.resetAll,
  resetTurn: initiativeActions.resetTurn,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeControls);
