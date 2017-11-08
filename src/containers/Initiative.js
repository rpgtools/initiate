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
import * as counterActions from '../actions/counters';
import * as timerActions from '../actions/timers';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  // Handlers
  handleCounterCreate = (counterId, creatureId) => {

  };
  handleCounterUpdate = (counterId, creatureId) => {};
  handleCounterDelete = (counterId, creatureId) => {};
  handleCreatureCreate = (name) => {
    this.props._creature.creatureCreate({name});
  };
  handleNextTurn = () => {};
  handleSortEnd = ({oldIndex, newIndex}) => {

  };

  // Renderers
  renderCreatureActions = (creatureId) => {

  }

  renderCreatures = (ids, creatures) => {
    var tokens = [];
    _.forEach(ids, (creatureId) => {
      const creature = creatures[creatureId];
      const counters = this.renderCounters(creature.counters);
      tokens.push(
        <InitiativeToken
          key={creature.id}
          title={creature.name}
          children={counters}
        />
      );
    });
    return tokens;
  };

  renderCounters = (creature) => {
    var counters = []
    _.forEach(creature.counters, (counter) => {
      counters.push(
        <Counter
          key={counter.id}
          label={counter.id}
          value={counter.value}
          onUpdateValue={(counter) => {this.handleCounterUpdate(counter, creature.id)}}
        />
      )
    });
    return counters;
  };

  render() {
    const creatures = this.renderCreatures(this.props.creatureIds, this.props.creatures);
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
    _creature: bindActionCreators(creatureActions, dispatch),
    _counter: bindActionCreators(counterActions, dispatch),
    _timer: bindActionCreators(timerActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
