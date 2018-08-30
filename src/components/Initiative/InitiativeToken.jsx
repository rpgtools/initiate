import React from 'react';
import Counter from './Counter';
import CreateCounterButton from './CreateCounterButton';
import { DragHandle } from '../reusable/SortableList';
import classNames from 'classnames';

export default class InitiativeToken extends React.Component {
  handleDeleteCounter = counterIndex => () =>
    this.props.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value => {
    console.log(value);
    this.props.updateCounter(this.props.creature.id, counterIndex, value);
  }

  handleCreateCounter = ({ label }) =>
    this.props.createCounter(this.props.creature.id, label);

  render() {
    const {
      selected,
      creature,
    } = this.props;
    const counters = creature.counters.map((counter, index) => {
      return(
        <Counter
          onUpdateCounter={this.handleUpdateCounter(index)}
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
          <CreateCounterButton onSubmit={this.handleCreateCounter}/>
          {counters}
        </div>
        <div className="initiative-token__actions">
          <DragHandle />
        </div>
      </div>
    );
  }
};
