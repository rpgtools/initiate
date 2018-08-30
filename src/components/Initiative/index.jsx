import React from 'react';
import {connect} from 'react-redux';

import CreateCreatureForm from './CreateCreatureForm';
import InitiativeToken from './InitiativeToken';
import ScrollContainer from '../reusable/ScrollContainer';
import SortableList from '../reusable/SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from '../../reducers/selectors';

class Initiative extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
  }

  render() {
    const {
      creatures,
      createCounter,
      updateCounter,
      deleteCounter,
      createCreature,
    } = this.props;
    const creatureProps = {
      createCounter,
      updateCounter,
      deleteCounter,
    };
    return (
      <ScrollContainer className="initiative">
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
  // updateCreature: creatureActions.updateCreature,
  // deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  // selectCreature: creatureActions.selectCreature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
