// Libs
import React from 'react';
// import PropTypes from 'prop-types';

// Child Components
import Counter from './Counter'
import {CreateButton} from './CreateButton'

export const Creature = (props) => {
    const {creature} = props
    var counters = []
    if(creature.counterIds.length > 0) {
      creature.counterIds.forEach((counterId) => {
        counters.push(
          <Counter
            key={counterId}
            counterId={counterId}
          />
        );
      });
    }

    return(
      <div className="creature">
        <h2 className="creature_name">{creature.name}</h2>
        {counters}
        <CreateButton onSubmit={props.onCounterSubmit} buttonLabel="New Counter" />
      </div>
    );
  }
