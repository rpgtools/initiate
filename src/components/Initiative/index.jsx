import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import SortableList from './SortableList';
import { actions as creatureActions } from '../../services/creatures';
import { creaturesSelector } from './selectors';
import {
  campaignCreaturesAllIdsStateSelector
} from '../../services/creatures/selectors';

class Initiative extends React.Component {
  state = {
    scrollTop: 0,
    shouldUpdateCounterPositions: false
  }

  componentDidUpdate(prevProps, prevState) {
    if  (
          prevState.scrollTop !== this.state.scrollTop ||
          prevProps.creatureOrder !== this.props.creatureOrder
        ) {
          this.setState({ shouldUpdateCounterPositions: true });
        } else if (prevState.shouldUpdateCounterPositions) {
          this.setState({ shouldUpdateCounterPositions: false });
        }
  }

  handleScroll = ref => event => {
    this.setState({ scrollTop: ref.current.scrollTop });
  }

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
      <div className="initiative widget" >
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
          handleScroll={this.handleScroll}
          shouldUpdateCounterPositions={this.state.shouldUpdateCounterPositions}
          {...tokenActions}
        />
    </div>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
  creatureOrder: campaignCreaturesAllIdsStateSelector(state),
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
