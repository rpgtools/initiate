import React from 'react';
import {connect} from 'react-redux';

import SingleInputForm from '../reusable/SingleInputForm';
import InitiativeToken from './InitiativeToken';
import Counter from './Counter';
import ScrollableContainer from '../reusable/ScrollableContainer';
import SortableList from '../reusable/SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from '../../reducers/selectors';

class Initiative extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
  }

  handleCreateCreatureSubmit = (values) => {
    this.props.createCreature(values.name);
  }

  render() {
    const creatures = this.props.creatures.map((creature, index) => {
      const counters = creature.counters.map((counter, index) => {
        return(
          <Counter value={counter.value} label={counter.label} isEditing={false} />
        );
      });
      return(
        <InitiativeToken title={creature.name}>
          {counters}
        </InitiativeToken>
      );
    });
    return (
      <ScrollableContainer className="initiative" >
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
        />
        <SingleInputForm placeholder="Enter a name..." onSubmit={this.handleCreateCreatureSubmit}/>
      </ScrollableContainer>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
  creatureOrder: state.creatures.allIds,
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  selectCreature: creatureActions.selectCreature,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
