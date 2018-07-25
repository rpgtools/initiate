import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

import Button from '../Button';
import SortableList from './SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from './selectors';

class Initiative extends React.Component {

  handleCreatureCreate = name => this.props.createCreature({ name });

  handleSortEnd = ({ oldIndex, newIndex }) =>
    this.props.reorderCreatures(oldIndex, newIndex);

  advanceInitiative = () => {
    this.props.reorderCreatures(0, -1);
    // this.setState({turn: this.state.turn + 1})
    // if (this.state.turn % this.props.creatures.length === 0){
    //   this.props._timer.addSeconds(6)
    // }
  }

  render() {
    const { creatures } = this.props;
    const tokenActions = {
      deleteCreature: this.props.deleteCreature,
      selectCreature: this.props.selectCreature,
      createCounter: this.props.createCounter,
      updateCounter: this.props.updateCounter,
      deleteCounter: this.props.deleteCounter,
    }
    return (
      <div className="initiative">
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          {...tokenActions}
        />
        <Button
          buttonLabel="New Creature"
          onSubmit={this.handleCreatureCreate}
        />
        <Button
          buttonLabel="Advance Initiative"
          onSubmit={this.advanceInitiative}
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
