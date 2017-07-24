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
    if(creatures.length < 1) { return; }
    var current = creatures.findIndex((item) => {return item.currentInitiative === true});
    if(current >= 0) {
      creatures.splice(current, 1, {...creatures[current], currentInitiative: false})
    }
    if(current === creatures.length-1) { current = -1 }
    creatures.splice(current+1, 1, {...creatures[current+1], currentInitiative: true});
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
        var currentInitiative = '';
        if(creature.currentInitiative) {
          currentInitiative = <span className="initiative_marker">GO</span>
        }
        creatures.push(
          <div>
            {currentInitiative}
            <Creature
              key={creature.id}
              creature={creature}
              counters={creature.counters}
            />
          </div>
        );
      });
    }

    return(
      <div>
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
