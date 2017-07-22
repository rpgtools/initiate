import React from 'react';
import {Counter} from './Counter'
import { connect } from 'react-redux';
import { counterCreate } from '../actions/counters';
import PropTypes from 'prop-types';

class Creature extends React.Component {
  render() {
    var counters = []
    if(this.props.counters.length > 0) {
      this.props.counters.forEach((counter) => {
        counters.push(
          <Counter key={counter.id}
            count={counter.count}
            label={counter.label}
          />
        );
      });
    }
    return(
      <div>
        {counters}
        <button
          className="counter-create"
          onClick={this.props.onClickCounterCreate}
        >New Creature</button>
      </div>
    );
	}
}

Creature.propTypes = {
  counters: PropTypes.array,
  onClickCounterCreate: PropTypes.func.isRequired
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
    onClickCounterCreate: (counter) => dispatch(counterCreate(counter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creature);
