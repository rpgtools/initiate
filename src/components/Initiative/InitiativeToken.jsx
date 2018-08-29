import React from 'react';
import Counter from './Counter';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';

export default class InitiativeToken extends React.Component {
  handleUpdateCounter = (index, newCounter) => {
    const { creature } = this.props;
    const updated = {
      ...creature,
      counters: creature.counters.map((counter, i) => {
        return (index === i) ? newCounter : counter;
      })
    };
    this.props.onUpdateCreature(updated);
  }

  render () {
    const {
      selected,
      creature,
    } = this.props;
    const counters = creature.counters.map((counter, index) => {
      return(
        <Counter
          onUpdate={(counter) => this.handleUpdateCounter(index, counter)}
          counter={counter}
          key={index}
        />
      );
    });
    const tokenClass = classNames({
      'initiative-token': true,
      'selected': selected,
    });
    return (
      <div className={tokenClass}>
        <div className="initiative-token__title">{creature.name}</div>
        <div className="initiative-token__counters">
          {counters}
        </div>
        <div className="initiative-token__actions">
          <DragHandle />
        </div>
      </div>
    );
  }
};
