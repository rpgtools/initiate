// Libs
import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
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
import * as timerActions from '../actions/timers';


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
    super(props);
    this.state = {
      turn: 1
    }
  };

  onAdvanceInitiative = () => {
    this.props._creature.reorderCreatures(0, -1);
    this.setState({turn: this.state.turn + 1})
    if (this.state.turn % this.props.creatureIds.length == 0){
      this.props._timer.addSeconds(6)
    }
  };

  onCreatureSubmit = name => {
    this.props._creature.creatureCreate({name})
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props._creature.reorderCreatures(oldIndex, newIndex);
  };

  handleCounterSubmit = counter => {
    this.props._counter.counterCreate(counter)
  };

  handleCreatureDelete = (creature) => {
    this.props._creature.creatureDelete(creature)
  };

  handleCounterDelete = (counter) => {
    this.props._counter.counterDelete(counter);
  };

  handleCounterUpdate = (counter, creatureId) => {
    this.props._counter.counterUpdate(counter, creatureId);
  };

  render() {
    const creatures = [];
    if(this.props.creatureIds.length > 0) {
      _.forEach(this.props.creatureIds, (creatureId) => {
        const creature = this.props.creatures[creatureId];
        const counters = creature.counters;
        creatures.push(
          <Creature
            key={creature.id}
            creature={creature}
            counters={counters}
            onCounterSubmit={this.handleCounterSubmit}
            onCreatureDelete={this.handleCreatureDelete}
            onCounterUpdate={this.handleCounterUpdate}
          />
        );
      });
    };

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
  };
};

// CreatureList.propTypes = {
//   creaturesIds: PropTypes.array,
//   creatures: PropTypes.objectOf(PropTypes.shape({
//     name: PropTypes.string,
//     id: PropTypes.string,
//     counters: PropTypes.array
//   })),
//   counters: PropTypes.objectOf(PropTypes.shape({
//     label: PropTypes.string,
//     id: PropTypes.string,
//     creatureId: PropTypes.string,
//     value: PropTypes.number
//   }))
// };

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

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
