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

  onCounterSubmit = label => {
    this.props.handleCounterCreate({label, count: 0})
  }

  render() {
    var counters = []
    if(this.props.counters.length > 0) {
      this.props.counters.forEach((counter) => {
        counters.push(
          <Counter key={counter.id}
            id={counter.id}
            count={counter.count}
            label={counter.label}
            onClickIncrement={this.handleCounterIncrement}
            onClickDecrement={this.handleCounterDecrement}
            incrementLabel="+"
            decrementLabel="-"
          />
        );
      });
    }

    return(
      <div>
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
  counters: []
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
