// Libs
import React from 'react';
import { connect } from 'react-redux';

// Child Components
import Counter from './Counter';
import Button from './Button';

import * as creatureActions from '../../actions/creatures';
import { creaturesSelector } from './selectors';

class Creature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  };

  handleDeleteCreature = () => this.props.deleteCreature(this.props.creature.id)

  handleCreateCounter = label => this.props.createCounter(this.props.creature.id, label);

  handleDeleteCounter = counterIndex => () =>
    this.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.updateCounter(this.props.creature.id, counterIndex, value);

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  handleCounterUpdate = counter => {
    this.props.onCounterUpdate({...counter, creatureId: this.props.creature.id});
  };

  render () {
    const { creature } = this.props;
    return (
      <div className="initiative-token">
        <h2 className="initiative-token_title">{creature.name}</h2>
        <div className="initiative-token_left">
          {creature.counters.map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              onUpdateValue={this.handleUpdateCounter(index)}
              onClickDelete={this.handleDeleteCounter(index)}
              />
          )}
        </div>
        <div className="initiative-token_right">
          <Button
            buttonLabel="New Counter"
            onSubmit={this.handleCreateCounter}
            />
          <Button
            buttonLabel="Delete Creature"
            onSubmit={this.handleDeleteCreature}
            />
        </div>
      </div>
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
  createCounter: creatureActions.createCounter,
  updateCounter: creatureActions.updateCounter,
  deleteCounter: creatureActions.deleteCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatureDetails);
