// Libs
import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';

// Child Components
import Counter from './Counter';
import {CreateButton} from './CreateButton';

export class Creature extends React.Component {

  handleCounterSubmit = label => {
    this.props.onCounterSubmit({label, creatureId: this.props.creature.id})
  };

  render() {
    const {creature} = this.props
    var counters = []
    if(_.size(this.props.counters) > 0) {
      _.forEach(this.props.counters, (counter) => {
        counters.push(
          <Counter
            key={counter.id}
            counter={counter}
          />
        );
      });
    }

    return(
      <div className="creature">
        <h2 className="creature_name">{creature.name}</h2>
        {counters}
        <CreateButton onSubmit={this.handleCounterSubmit} buttonLabel="New Counter" />
      </div>
    );
  }
}
