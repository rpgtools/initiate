import React from 'react';

import Counter from '../Counter';
import Button from '../Button';

const InitiativeToken = ({
  creature,
  deleteCreature,
  createCounter,
  deleteCounter,
  updateCounter,
}) => {
  const handleDeleteCreature = () => deleteCreature(creature.id)

  const handleCreateCounter = label => createCounter(creature.id, label);

  const handleDeleteCounter = counterIndex => () =>
    deleteCounter(creature.id, counterIndex);

  const handleUpdateCounter = counterIndex => value =>
    updateCounter(creature.id, counterIndex, value);

  return (
    <div className="initiative-token">
      <h2 className="initiative-token_title">{creature.name}</h2>
      <div className="initiative-token_left">
        {creature.counters.map((counter, index) =>
          <Counter
            key={index}
            label={counter.label}
            value={counter.value}
            onUpdateValue={handleUpdateCounter(index)}
            onClickDelete={handleDeleteCounter(index)}
            />
        )}
      </div>
      <div className="initiative-token_right">
        <Button
          buttonLabel="New Counter"
          onSubmit={handleCreateCounter}
          />
        <Button
          buttonLabel="Delete Creature"
          onSubmit={handleDeleteCreature}
          />
      </div>
    </div>
  );
};

export default InitiativeToken;
