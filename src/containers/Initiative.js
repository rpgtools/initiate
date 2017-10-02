// Libs
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

// Child Components
import {Counter} from '../components/Counter';
import {CreateButton} from '../components/CreateButton';
import {InitiativeToken} from '../components/InitiativeToken';
import {SortableList} from '../components/SortableList';

// Actions
import * as creatureActions from '../actions/creatures';
import * as counterActions from '../actions/counters';
import * as timerActions from '../actions/timers';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {turn: 1};
  };

  renderTokens(ids, entities) {
    if(this.props.creatureIds.length > 0) {
      _.forEach(this.props.creatureIds, (creatureId) => {
        const creature = this.props.creatures[creatureId];
        const counters = rendercreature.counters;
        creatures.push(
          <Creature
            key={creature.id}
            creature={creature}
            onCounterSubmit={this.handleCounterSubmit}
            onCreatureDelete={this.handleCreatureDelete}
            onCounterUpdate={this.handleCounterUpdate}
          />
        );
      });
    };
  }
}

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
