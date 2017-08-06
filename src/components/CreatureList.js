import React from 'react';
import Creature from './Creature'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {CreateButton} from './CreateButton'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// actions
import * as creatureActions from '../actions/creatures';

const SortableItem = SortableElement(({value}) =>
  <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div>
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
      creatures: props.creatures,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      creatures: nextProps.creatures
    })
  }

  onAdvanceInitiative = () => {
    var creatures = this.state.creatures;
    creatures.push(creatures.shift());
    this.setState({creatures})
  }

  onCreatureSubmit = name => {
    this.props._creature.creatureCreate({name})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      creatures: arrayMove(this.state.creatures, oldIndex, newIndex),
    });
  };

  render() {
    var creatures = []
    if(this.state.creatures.allIds.length > 0) {
      this.state.creatures.allIds.forEach((creature_id) => {
        var creature = this.state.creatures.byId[creature_id]
        creatures.push(
          <Creature
            key={creature.id}
            creature={creature}
            counters={creature.counters}
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
  creatures: PropTypes.array
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
    _creature: bindActionCreators(creatureActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
