import React from 'react';
import Counter from './Counter';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';

export default class InitiativeToken extends React.Component {
  handleCounterUpdate = (index, value) => {
    this.props.onUpdate(this.props.creatureId, index, value);
  }
  render () {
    const {
      selected,
      creature,
      className,
      ...rest
    } = this.props;
    const tokenClass = classNames({
      'initiative-token': true,
      [`${className}`]: ('undefined' !== className),
      'selected': selected,
    });
    const counters = creature.counters.map((counter, index) => {
      return(
        <Counter
          onUpdate={() => this.handleCounterUpdate(index)}
          value={counter.value}
          label={counter.label}
          key={index}
        />
      );
    });
    return (
      <div className={tokenClass} {...rest}>
        <div className="initiative-token__title">{creature.name}</div>
        <div className="initiative-token__children">
          {counters}
        </div>
        <div className="initiative-token__actions">
          <DragHandle />
        </div>
      </div>
    );
  }
};
