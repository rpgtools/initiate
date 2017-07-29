import React from 'react';
import Creature from './Creature'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {CreateButton} from './CreateButton'
import {connect} from 'react-redux';
import {creatureCreate, creatureUpdate} from '../actions/creatures';
import PropTypes from 'prop-types';

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
    this.props.handleCreatureCreate({name})
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      creatures: arrayMove(this.state.creatures, oldIndex, newIndex),
    });
  };

  render() {
    var creatures = []
    if(this.state.creatures.length > 0) {
      this.state.creatures.forEach((creature) => {
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
        <SortableList items={creatures} onSortEnd={this.onSortEnd} distance={10} />
        <div><button className="button button_advance_initiative" onClick={this.onAdvanceInitiative}>Advance Initiative</button></div>
        <div><CreateButton onSubmit={this.onCreatureSubmit} buttonLabel="New Creature" /></div>
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
