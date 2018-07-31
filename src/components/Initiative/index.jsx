import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

import SortableList from './SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from './selectors';

class Initiative extends React.Component {
//TODO: make functional class
  handleSortEnd = ({ oldIndex, newIndex }) =>
    this.props.reorderCreatures(oldIndex, newIndex);

  render() {
    const { creatures } = this.props;
    const tokenActions = {
      selectCreature: this.props.selectCreature,
      updateCounter: this.props.updateCounter,
      deleteCounter: this.props.deleteCounter,
    }
    return (
      <div className="initiative widget">
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
          {...tokenActions}
        />
    </div>
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
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
