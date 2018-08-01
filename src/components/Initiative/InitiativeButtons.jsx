import React from 'react';
import { connect } from 'react-redux';
import * as creatureActions from '../../actions/creatures';

const InitiativeButtonsWidget = ({ creatures, initCreateCreature, reorderCreatures }) => {
  const advanceInitiative = () => {
    reorderCreatures(0, creatures.length - 1);
  };

  return (
    <div className='initiative-buttons'>
      <button
        name="Advance Initiative"
        onClick={advanceInitiative}
      >Advance Initiative
    </button>
      <button
        name="New Creature"
        onClick={initCreateCreature}
      >New Creature
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  creatures: state.creatures.allIds,
});

const mapDispatchToProps = {
  initCreateCreature: creatureActions.initCreateCreature,
  reorderCreatures: creatureActions.reorderCreatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeButtonsWidget);
