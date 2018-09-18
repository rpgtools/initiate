import React from 'react';
import {connect} from 'react-redux';

import * as creatureActions from '../../store/creatures/actions';
import * as initiativeActions from '../../store/initiative/actions';
import { creaturesSelector } from './selectors';

import CreateCreatureForm from './CreateCreatureForm';
import InitiativeToken from './InitiativeToken';
import InitiativeControls from '../InitiativeControls'
import ScrollContainer from '../reusable/ScrollContainer';
import SortableList from '../reusable/SortableList';

class Initiative extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
  }
  render() {
    const {
      createCounter,
      createCreature,
      creatures,
      deleteCounter,
      updateCounter,
      updateCreature,
    } = this.props;
    const creatureProps = {
      createCounter,
      deleteCounter,
      updateCounter,
      updateCreature,
    };
    const controls = (<InitiativeControls />);
    return (
      <div className="initiative">
        <ScrollContainer>
          <SortableList
            onSortEnd={this.handleSortEnd}
            useDragHandle
            >
            {creatures.map((creature, creatureIndex) =>
              <InitiativeToken key={creature.id} creature={creature} {...creatureProps} />
            )}
          </SortableList>
          <CreateCreatureForm createCreature={createCreature} />
        </ScrollContainer>
        {(creatures.length) ? controls : 'Add a creature to get started.'}
      </div>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
});

const mapDispatchToProps = {
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  reorderCreatures: initiativeActions.reorder,
  // selectCreature: creatureActions.selectCreature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
