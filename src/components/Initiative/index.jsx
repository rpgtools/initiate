import React from 'react';
import {connect} from 'react-redux';

import SingleInputForm from '../reusable/SingleInputForm';
import InitiativeToken from './InitiativeToken';
import Counter from './Counter';
import ScrollableContainer from '../reusable/ScrollableContainer';
import SortableList from '../reusable/SortableList';
import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from '../../reducers/selectors';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCounter: [],
    }
  }

  handleCounterClick = (signature) => {
    this.setState({openCounter: signature});
  }

  handleCreateCreatureSubmit = (values) => {
    this.props.createCreature(values.name);
  }

  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.props.reorderCreatures(oldIndex, newIndex);
  }

  render() {
    const { openCounter } = this.state;
    const creatures = this.props.creatures.map((creature, creatureIndex) => {
      const counters = creature.counters.map((counter, index) => {
        let signature = creature.id + "-" + index;
        return(
          <Counter
            onClick={() => this.handleCounterClick(signature)}
            onSubmit={() => this.handleCounterClick(signature)}
            onUpdate={() => this.handleCounterClick(signature)}
            value={counter.value}
            label={counter.label}
            isEditing={(signature == openCounter)}
            key={index}
          />
        );
      });
      return(
        <InitiativeToken title={creature.name}>
          {counters}
        </InitiativeToken>
      );
    });
    return (
      <ScrollableContainer className="initiative" >
        <SortableList
          items={creatures}
          onSortEnd={this.handleSortEnd}
          useDragHandle
        />
        <SingleInputForm placeholder="Enter a name..." onSubmit={this.handleCreateCreatureSubmit}/>
      </ScrollableContainer>
    );
  };
};

const mapStateToProps = state => ({
  creatures: creaturesSelector(state),
});

const mapDispatchToProps = {
  createCreature: creatureActions.createCreature,
  updateCreature: creatureActions.updateCreature,
  deleteCreature: creatureActions.deleteCreature,
  reorderCreatures: creatureActions.reorderCreatures,
  selectCreature: creatureActions.selectCreature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Initiative);
