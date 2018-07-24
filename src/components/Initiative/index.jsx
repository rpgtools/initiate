import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';

// Child Components
import Button from '../Button';
import SortableList from './SortableList';

// Actions
import * as creatureActions from '../../actions/creatures';
import * as timerActions from '../../actions/timers';

import { creaturesSelector } from './selectors';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  handleCreatureCreate = (name) => {
    this.props.createCreature({name});
  };

  handleSortEnd = ({oldIndex, newIndex}) => this.props.reorderCreatures(oldIndex, newIndex);

  advanceInitiative = () => {
    this.props.reorderCreatures(0, -1);
    this.setState({turn: this.state.turn + 1})
    if (this.state.turn % this.props.creatures.length === 0){
      this.props._timer.addSeconds(6)
    }
  }

  render() {
    const { creatures, ...actions } = this.props;
    return (
      <div className="initiative">
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          {...actions}
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
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
