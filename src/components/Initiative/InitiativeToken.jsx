import React from 'react';
import Counter from '../Counter';
import Button from '../Button';
import { DragHandle } from './SortableList';

const InitiativeToken = ({
  creature,
  deleteCreature,
  createCounter,
  deleteCounter,
  updateCounter,
  selectCreature,
}) => {
  const handleDeleteCreature = () => deleteCreature(creature.id)

  const handleCreateCounter = label => createCounter(creature.id, label);

  const handleDeleteCounter = counterIndex => () =>
    deleteCounter(creature.id, counterIndex);

  const handleUpdateCounter = counterIndex => value =>
    updateCounter(creature.id, counterIndex, value);

  const handleSelectCreature = () => selectCreature(creature.id);

  return (
    <div className="initiative__token" onClick={handleSelectCreature}>
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
        {/*
          <div className="initiative__token">
            <Button
            buttonLabel="New Counter"
            onSubmit={handleCreateCounter}
            />
          <Button
            buttonLabel="Delete Creature"
            onSubmit={handleDeleteCreature}
            />
          </div>
          */}
        <DragHandle />
    </div>
  );
};

export default InitiativeToken;
