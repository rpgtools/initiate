import React from 'react';
import {Counter} from './Counter'
import {CreateButton} from './CreateButton'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// actions
import * as counterActions from '../actions/counters';

class Creature extends React.Component {
  handleSetCount = counter => {
    this.props._counter.counterUpdate(counter)
  }

  onCounterSubmit = label => {
    this.props._counter.counterCreate({label, creature: {id: this.props.creature.id}})
  }

  render() {
    const {counterIds} = this.props
    var counters = []
    if(counterIds.length > 0) {
      counterIds.forEach((counterId) => {
        counters.push(
          <Counter
            key={counterId}
            id={counterId}
            handleSetCount={this.handleSetCount}
          />
        );
      });
    }

    return(
      <div className="creature">
        <h2 className="creature_name">{this.props.creature.name}</h2>
        {counters}
        <CreateButton onSubmit={this.onCounterSubmit} buttonLabel="New Counter" />
      </div>
    );
  }
}

Creature.propTypes = {
  creatureId: PropTypes.string.isRequired,
  creature: PropTypes.object,
  counterIds: PropTypes.array,
}

Creature.defaultProps = {
  counterIds: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    creature: state.creatures.byId[ownProps.creatureId],
    counterIds: state.creatures.byId[ownProps.creatureId].counterIds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _counter: bindActionCreators(counterActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creature);
