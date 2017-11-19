/* @TODO:

 TODOS:
  * Rename to View (see: https://unbug.gitbooks.io/react-native-training/content/45_naming_convention.html)
  * Put counters as properties on creatures(label:value pairs)
  * EVENTUALLY: Figure out saving settings for counters
  */


// Libs
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

// Child Components
import Counter from '../components/Counter';
import CreateButton from '../components/CreateButton';
import InitiativeToken from '../components/InitiativeToken';
import SortableList from '../components/SortableList';

// Actions
import * as creatureActions from '../actions/creatures';
import * as timerActions from '../actions/timers';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  // Handlers
  handleCounterCreate = (label, creatureId) => {
    let creature = this.props.creatures[creatureId];
    creature.counters.push({label, value: 0});
    this.props.actions.creature.creatureUpdate(creature);
  };
  handleCounterUpdate = (counter, creatureId) => {
    let creature = this.props.creatures[creatureId];
    creature.counters[counter.id].value = counter.value;
    this.props.actions.creature.creatureUpdate(creature);
  };
  handleCounterDelete = (counterId, creatureId) => {
    let creature = this.props.creatures[creatureId];
    creature.counters.splice(counterId, 1);
    this.props.actions.creature.creatureUpdate(creature);
  };
  handleCreatureCreate = (name) => {
    this.props.actions.creature.creatureCreate({name});
  };
  handleNextTurn = () => {};
  handleSortEnd = ({oldIndex, newIndex}) => {

  };

  // Renderers

  renderCreatures = () => {
    var tokens = [];
    _.forEach(this.props.creatureIds, (creatureId) => {
      const creature = this.props.creatures[creatureId];

      const updateCounterCallback = (counter) => {this.handleCounterUpdate(counter, creature.id)};
      const deleteCounterCallback = (counterId) => {this.handleCounterDelete(counterId, creature.id)};

      const counters = this.renderCounters(creature.counters, updateCounterCallback, deleteCounterCallback);
      const creatureActions = this.renderCreatureActions(creature.id);

      tokens.push(
        <InitiativeToken
          key={creature.id}
          title={creature.name}
          children={counters}
          buttons={creatureActions}
        />
      );
    });
    return tokens;
  };

  renderCreatureActions = (creatureId) => {
    const assignCounterLabel = label => {
      this.handleCounterCreate(label, creatureId);
    }
    var creatureActions = (
      <CreateButton
        onSubmit={assignCounterLabel}
        buttonLabel="New Counter"
      />
    );
    return creatureActions;
  }

  renderCounters = (counters, handleCounterUpdate, handleCounterDelete) => {
    var output = [];
    var id = 0;
    _.forEach(counters, (counter) => {
      output.push(
        <Counter
          id={id}
          key={id++}
          label={counter.label}
          value={counter.value}
          onUpdateValue={handleCounterUpdate}
          onCounterDelete={handleCounterDelete}
        />
      );
    });
    return output;
  };

  render() {
    const creatures = this.renderCreatures();
    return (
      <div className="initiative">
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
        />
        <CreateButton
          onSubmit={this.handleCreatureCreate}
          buttonLabel="New Creature"
        />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    creatureIds: state.creatures.allIds,
    creatures: state.creatures.byId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      creature: bindActionCreators(creatureActions, dispatch),
      timer: bindActionCreators(timerActions, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
