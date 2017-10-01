// Libs
import React from 'react';
import _ from 'lodash';

// Child Components
import Counter from './Counter';
import {CreateButton} from './CreateButton';

export class Creature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  };

  handleCounterSubmit = label => {
    this.props.onCounterSubmit({label, creatureId: this.props.creature.id});
  };

  handleCreatureDelete = () => {
    this.props.onCreatureDelete(this.props.creature);
  };

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  handleCounterUpdate = counter => {
    this.props.onCounterUpdate(counter, this.props.creature.id);
  };

  render() {
    const {creature} = this.props;
    const counters = [];
    if(_.size(this.props.counters) > 0) {
      _.forEach(this.props.counters, (counter) => {
        counters.push(
          <Counter
            key={counter.id}
            counter={counter}
            onCounterUpdate={this.handleCounterUpdate}
          />
        );
      });
    };
    const className = (!this.state.editing) ? "creature" : "creature editing";
    return(
      <div className={className}>
        <h2 className="creature_name">{creature.name}</h2>
        {counters}
        <CreateButton onSubmit={this.handleCounterSubmit} buttonLabel="New Counter" />
        <button className="button__edit" onClick={this.toggleCreatureEdit} >Edit Creature</button>
        <button className="button__delete" onClick={this.handleCreatureDelete} >Delete Creature</button>
      </div>
    );
  };
};
