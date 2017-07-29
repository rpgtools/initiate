import React from 'react';
import {Counter} from './Counter'
import {CreateButton} from './CreateButton'
import { connect } from 'react-redux';
import { counterCreate, counterUpdate } from '../actions/counters';
import PropTypes from 'prop-types';

class Creature extends React.Component {
  handleCounterDecrement = current => {
    this.props.handleCounterUpdate({...current, count: current.count - 1})
  }

  handleCounterIncrement = current => {
    this.props.handleCounterUpdate({...current, count: current.count + 1})
  }

  handleSetCount = counter => {
    this.props.handleCounterUpdate(counter)
  }

  onCounterSubmit = label => {
    this.props.handleCounterCreate({label, creature: {id: this.props.creature.id}})
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
  handleCounterCreate: PropTypes.func.isRequired,
}

Creature.defaultProps = {
  counters: [],
  currentInitiative: false,
}

const mapStateToProps = (state) => {
  return {
    counters: state.counters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCounterCreate: (counter) => dispatch(counterCreate(counter)),
    handleCounterUpdate: (counter) => dispatch(counterUpdate(counter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creature);
