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
    this.props.onCounterSubmit({label, entityId: this.props.entity.id});
  };

  handleCreatureDelete = () => {
    this.props.onCreatureDelete(this.props.entity);
  };

  toggleCreatureEdit = () => {
    this.setState({editing: !this.state.editing});
  };

  render() {
    const {entity} = this.props;
    const counters = [];
    if(_.size(this.props.counters) > 0) {
      _.forEach(this.props.counters, (counter) => {
        counters.push(
          <Counter
            key={counter.id}
            counter={counter}
          />
        );
      });
    };
    const className = (!this.state.editing) ? "entity" : "entity editing";
    return(
      <div className={className}>
        <h2 className="entity_name">{entity.name}</h2>
        {counters}
        <CreateButton onSubmit={this.handleCounterSubmit} buttonLabel="New Counter" />
        <button className="button__edit" onClick={this.toggleCreatureEdit} >Edit Creature</button>
        <button className="button__delete" onClick={this.handleCreatureDelete} >Delete Creature</button>
      </div>
    );
  };
};
