import React from 'react';

import Counter from '../Counter';
import Button from '../Button';

class InitiativeToken extends React.Component {

  handleCreateCounter = label => {
    this.props.createCounter(this.props.creature.id, label);
  };

  handleDeleteCounter = counterIndex => () => {
    this.props.deleteCounter(this.props.creature.id, counterIndex);
  };

  handleUpdateCounter = counterIndex => value => {
    this.props.updateCounter(this.props.creature.id, counterIndex, value);
  };

  render () {
    const { creature } = this.props;
    return (
      <div className="initiative-token">
        <h2 className="initiative-token_title">{creature.name}</h2>
        <div className="initiative-token_left">
          {creature.counters.map((counter, index) =>
            <Counter
              key={index}
              label={counter.label}
              value={counter.value}
              onUpdateValue={this.handleUpdateCounter(index)}
              onClickDelete={this.handleDeleteCounter(index)}
            />
          )}
        </div>
        <div className="initiative-token_right">
          <Button
            buttonLabel="New Counter"
            onSubmit={this.handleCreateCounter}
          />
          <Button
            buttonLabel="Edit Creature"
            onSubmit={console.log('EDIT CREATURE')}
          />
          <Button
           buttonLabel="Delete Creature"
           onSubmit={this.handleDeleteCounter}
          />
        </div>
      </div>
    );
  }
}
