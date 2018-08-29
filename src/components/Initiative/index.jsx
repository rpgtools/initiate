import React from 'react';
import {connect} from 'react-redux';

import CreateCreatureForm from './CreateCreatureForm';
import InitiativeToken from './InitiativeToken';
import ScrollableContainer from '../reusable/ScrollableContainer';
import SortableList from '../reusable/SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from '../../reducers/selectors';

class Initiative extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
  }

  render() {
    const creatures = this.props.creatures.map((creature, creatureIndex) => {
      return(
        <InitiativeToken creature={creature} onUpdateCreature={this.props.updateCreature} />
      );
    });
    return (
      <ScrollableContainer className="initiative">
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
        />
        <CreateCreatureForm createCreature={this.props.createCreature} />
      </ScrollableContainer>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  selectCreature: creatureActions.selectCreature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
