import React from 'react';
import Counter from '../Counter';
import { DragHandle } from './SortableList';

export default class InitiativeToken extends React.Component {
  handleDeleteCounter = counterIndex => () =>
    this.props.deleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.props.updateCounter(this.props.creature.id, counterIndex, value);

  handleSelectCreature = e => {
    if (!e.target.className.startsWith('counter')) {
      this.props.selectCreature(this.props.creature.id);
    }
  };

  render () {
    const { creature } = this.props;
    const {
      handleSelectCreature,
      handleUpdateCounter,
      handleDeleteCounter
    } = this;

    return (
      <div
        className="initiative__token"
        onClick={handleSelectCreature}
        >
        <h2 className="initiative__token--title">{creature.name}</h2>
        <div className="initiative__token--counters">
          {creature.counters.map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              handleUpdateValue={handleUpdateCounter(index)}
              onClickDelete={handleDeleteCounter(index)}
              />
          )}
        </div>
          <DragHandle />
        </div>
      );
  }
};
