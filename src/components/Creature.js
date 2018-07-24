// Libs
import React from 'react';
import _ from 'lodash';

// Child Components
import Counter from './Counter';
import {Button} from './Button';

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
    this.props.onCounterUpdate({...counter, creatureId: this.props.creature.id});
  };

  render() {
    const {creature} = this.props;
    const counters = [];
    if(_.size(this.props.creature.counters) > 0) {
      _.forOwn(this.props.creature.counters, (value, id) => {
        counters.push(
          <Counter
            key={id}
            label={id}
            value={value}
            onUpdateValue={this.handleCounterUpdate}
          />
        );
      });
    };
    const className = (!this.state.editing) ? "creature" : "creature editing";
    return(
      <div className={className}>
        <h2 className="creature_name">{creature.name}</h2>
        {counters}
        <Button onSubmit={this.handleCounterSubmit} buttonLabel="New Counter" />
        <button className="button__edit" onClick={this.toggleCreatureEdit} >Edit Creature</button>
        <button className="button__delete" onClick={this.handleCreatureDelete} >Delete Creature</button>
      </div>
    );
  };
};
