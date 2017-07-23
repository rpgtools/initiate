import React from 'react';
import Creature from './Creature'
import {CreateButton} from './CreateButton'
import { connect } from 'react-redux';
import { creatureCreate, creatureUpdate } from '../actions/creatures';
import PropTypes from 'prop-types';

class CreatureList extends React.Component {

  onCreatureSubmit = name => {
    this.props.handleCreatureCreate({name})
  }

  render() {
    var creatures = []
    if(this.props.creatures.length > 0) {
      this.props.creatures.forEach((creature) => {
        creatures.push(
          <Creature
            key={creature.id}
            creature={creature}
            counters={creatures.counters}
          />
        );
      });
    }

    return(
      <div>
        {creatures}
        <CreateButton onSubmit={this.onCreatureSubmit} buttonLabel="New Creature" />
      </div>
    );
  }
}

CreatureList.propTypes = {
  creatures: PropTypes.array,
  handleCreatureCreate: PropTypes.func.isRequired,
}

CreatureList.defaultProps = {
  creatures: []
}

const mapStateToProps = (state) => {
  return {
    creatures: state.creatures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreatureCreate: (creature) => dispatch(creatureCreate(creature)),
    handleCreatureUpdate: (creature) => dispatch(creatureUpdate(creature)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
