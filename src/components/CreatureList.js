// Libs
import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// Child Components
import {Creature} from './Creature'
import {CreateButton} from './CreateButton'

// Actions
import * as creatureActions from '../actions/creatures';
import * as counterActions from '../actions/counters';


const SortableItem = SortableElement(({value}) =>
  <div className="SortableItem">{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="SortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class CreatureList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creatureIds: props.creatureIds
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      creatureIds: nextProps.creatureIds
    })
  }

  onAdvanceInitiative = () => {
    const {creatureIds} = this.state;
    creatureIds.push(creatureIds.shift());
    this.setState({creatureIds})
  }

  onCreatureSubmit = name => {
    this.props._creature.creatureCreate({name})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      creatureIds: arrayMove(this.state.creatureIds, oldIndex, newIndex),
    });
  };

  // From Creature
  handleCounterSubmit = counter => {
    this.props._counter.counterCreate(counter)
  };

//  From Counter


  render() {
    var creatures = []
    if(_.size(this.props.creatures) > 0) {
      _.forEach(this.props.creatures, (creature) => {
        const counters = _.pick(this.props.counters, creature.counterIds)
        creatures.push(
          <Creature
            key={creature.id}
            creature={creature}
            counters={counters}
            onCounterSubmit={this.handleCounterSubmit}
          />
        );
      });
    }

    return(
      <div className="creature-list">
        <SortableList
          items={creatures}
          onSortEnd={this.onSortEnd}
          distance={10} />
        <div>
          <button
            className="button button_advance_initiative"
            onClick={this.onAdvanceInitiative}>Advance Initiative
          </button>
        </div>
        <div>
          <CreateButton
            onSubmit={this.onCreatureSubmit}
            buttonLabel="New Creature" />
        </div>
      </div>
    );
  }
}

CreatureList.propTypes = {
  creaturesIds: PropTypes.array
}

CreatureList.defaultProps = {
  creatureIds: []
}

const mapStateToProps = (state) => {
  return {
    creatures: state.creatures.byId,
    counters: state.counters.byId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _creature: bindActionCreators(creatureActions, dispatch),
    _counter: bindActionCreators(counterActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
