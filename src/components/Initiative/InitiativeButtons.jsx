import React from 'react';
import { connect } from 'react-redux';
import * as creatureActions from '../../actions/creatures';
import Button from '../reusable/Button';

const InitiativeButtonsWidget = ({ creatures, initCreateCreature, reorderCreatures }) => {
  const advanceInitiative = () => {
    reorderCreatures(0, creatures.length - 1);
  };

  return (
    <div className='initiative-buttons'>
      <Button
        className="initiative-buttons__advance-initiative"
        label="Advance Initiative"
        onClick={advanceInitiative}
        color="yellow"
      />
      <Button
        className="initiative-buttons__new-creature"
        label="New Creature"
        onClick={initCreateCreature}
        color="blue"
        />
    </div>
  );
};

const mapStateToProps = state => ({
  creatures: state.creatures.allIds,
});

const mapDispatchToProps = {
  reorderCreatures: creatureActions.reorderCreatures,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeButtonsWidget);
