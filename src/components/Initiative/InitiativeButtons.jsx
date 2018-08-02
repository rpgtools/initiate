import React from 'react';
import { connect } from 'react-redux';
import * as creatureActions from '../../actions/creatures';
import Button from '../Button';

const InitiativeButtonsWidget = ({ creatures, initCreateCreature, reorderCreatures }) => {
  const advanceInitiative = () => {
    reorderCreatures(0, creatures.length - 1);
  };

  return (
    <div className='initiative-buttons'>
      <Button
        label="Advance Initiative"
        onClick={advanceInitiative}
      />
    </div>
  );
};
// <Button
//   label="New Creature"
//   onClick={initCreateCreature}
// />

const mapStateToProps = state => ({
  creatures: state.creatures.allIds,
});

const mapDispatchToProps = {
  initCreateCreature: creatureActions.initCreateCreature,
  reorderCreatures: creatureActions.reorderCreatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeButtonsWidget);
