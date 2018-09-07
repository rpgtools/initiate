import React from 'react';
import { connect } from 'react-redux';
import * as initiativeActions from '../../store/initiative/actions';
import * as selectors from './selectors';
import Button from '../reusable/Button';

const InitiativeControls = ({ turn, round, reset, nextTurn }) => {
  return (
    <div className='initiative-controls'>
      <Button
        className="initiative-controls__reset"
        label="Reset"
        onClick={reset}
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
};

const mapStateToProps = state => ({
  turn: selectors.turnSelector(state),
  round: selectors.roundSelector(state)
});

const mapDispatchToProps = {
  reset: initiativeActions.reset,
  nextTurn: initiativeActions.nextTurn,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeControls);
