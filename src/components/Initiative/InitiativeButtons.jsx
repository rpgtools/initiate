import React from 'react';
import { connect } from 'react-redux';
import * as creatureActions from '../../actions/creatures';
import Button from '../Button';

const InitiativeButtonsWidget = ({ creatures, createCreature, reorderCreatures }) => {
  const advanceInitiative = () => {
    reorderCreatures(0, creatures.length - 1);
  };

  return (
    <div className='initiative-buttons'>
      <Button
        buttonLabel="New Creature"
        onSubmit={createCreature}
        />
      <Button
        buttonLabel="Advance Initiative"
        onSubmit={advanceInitiative}
        />
    </div>
  );
};

const mapStateToProps = state => ({
  creatures: state.creatures.allIds,
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  reorderCreatures: creatureActions.reorderCreatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeButtonsWidget);
