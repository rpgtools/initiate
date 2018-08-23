import React from 'react';
import {connect} from 'react-redux';

import SortableList from '../reusable/SortableList';
import InitiativeToken from './InitiativeToken';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from './selectors';

class Initiative extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
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
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
        />
    </div>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
  creatureOrder: state.creatures.allIds,
});

const mapDispatchToProps = {
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  selectCreature: creatureActions.selectCreature,
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
