import React from 'react';
import {Counter} from './Counter'

export class Creature extends React.Component {
  render() {
    var counters = []
    this.props.counters.forEach((counter) => {
      counters.push(<Counter key={counter.id} count={counter.count}
                      label={counter.label} />
      );
    });
    return(
      <div>{counters}</div>
    );
	}
}
