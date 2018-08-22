import React from 'react';
import Counter from './Counter';
import { DragHandle } from '../ui/SortableList';

export default class InitiativeToken extends React.Component {
  constructor (props) {
    super(props);
    this.tokenRef = React.createRef();
  };

  handleDeleteCounter = counterIndex => () =>
    this.props.onDeleteCounter(this.props.creature.id, counterIndex);

  handleUpdateCounter = counterIndex => value =>
    this.props.onUpdateCounter(this.props.creature.id, counterIndex, value);

  handleClick = e => {
    if (!e.target.className.startsWith('counter')) {
      this.props.onSelect(this.props.creature.id);
    }
  };

  render () {
    const { creature, scrollTop } = this.props;
    const {
      tokenRef,
      handleClick,
      handleUpdateCounter,
      handleDeleteCounter
    } = this;
    return (
      <div
        className="initiative__token"
        onClick={handleClick}
        ref={tokenRef}
      >
        <h2 className="initiative__token--title">{creature.name}</h2>
        <div className="initiative__token--counters">
          {creature.counters.map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              onUpdateValue={handleUpdateCounter(index)}
              onClickDelete={handleDeleteCounter(index)}
              scrollTop={scrollTop}
              />
          )}
        </div>
        <DragHandle />
      </div>
    );
  }
};
