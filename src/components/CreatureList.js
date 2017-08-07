// Libs
import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Child Components
import Creature from './Creature'
import {CreateButton} from './CreateButton'

// Actions
import * as creatureActions from '../actions/creatures';

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

  render() {
    const {creatureIds} = this.state;
    var creatures = []
    if(creatureIds.length > 0) {
      creatureIds.forEach((creatureId) => {
        creatures.push(
          <Creature
            key={creatureId}
            creatureId={creatureId}
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
    creatureIds: state.creatures.allIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _creature: bindActionCreators(creatureActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);
