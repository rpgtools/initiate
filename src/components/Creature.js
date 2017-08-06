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
    var counters = []
    if(this.props.counters.length > 0) {
      this.props.counters.forEach((counter) => {
        if(counter.creature.id === this.props.creature.id) {
          counters.push(
            <Counter
              key={counter.id}
              id={counter.id}
              count={counter.count}
              label={counter.label}
              handleSetCount={this.handleSetCount}
            />
          );
        }
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
  counters: PropTypes.array,
}

Creature.defaultProps = {
  counters: [],
  currentInitiative: false,
}

const mapStateToProps = state => {
  return {
    counters: state.counters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    _counter: bindActionCreators(counterActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creature);
