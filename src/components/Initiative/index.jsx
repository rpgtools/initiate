import React from 'react';
import {connect} from 'react-redux';

import CreatureCreateForm from '../CreatureCreateForm';
import InitiativeToken from './InitiativeToken';
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
    const tokenActions = {
      onSelect: this.props.selectCreature,
      onUpdateCounter: this.props.updateCounter,
      onDeleteCounter: this.props.deleteCounter,
    }
    const creatures = this.props.creatures.map((creature, index) => {
      return(<InitiativeToken creature={creature} {...tokenActions} />);
    });
    return (
      <div className="initiative widget" >
        <ScrollableContainer>
          <SortableList
            items={creatures}
            onSortEnd={this.handleSortEnd}
            useDragHandle
          />
        <CreatureCreateForm onSubmit={this.handleCreateCreatureSubmit}/>
      </ScrollableContainer>
    </div>
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
