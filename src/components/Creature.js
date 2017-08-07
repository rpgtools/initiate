// Libs
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Child Components
import Counter from './Counter'
import {CreateButton} from './CreateButton'

// Actions
import * as counterActions from '../actions/counters';

class Creature extends React.Component {
  onCounterSubmit = label => {
    this.props._counter.counterCreate({label, creatureId: this.props.creature.id})
  }

  render() {
    const {counterIds} = this.props
    var counters = []
    if(counterIds.length > 0) {
      counterIds.forEach((counterId) => {
        counters.push(
          <Counter
            key={counterId}
            counterId={counterId}
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
