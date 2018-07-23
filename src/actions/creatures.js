const uuid = require('uuid/v4');

export const creatureCreate = creature => {
  return {
    type: 'CREATURE_CREATE',
    payload: {
      creature: {
        ...creature,
        id: uuid(),
        counters: [],
      },
    },
  };
};

export const creatureUpdate = creature => {
  return {
    payload: {creature}
  };
};

export const creatureDelete = creature => {
  return {
    type: 'CREATURE_DELETE',
    payload: {creature}
  };
};

export const reorderCreatures = (previousIndex, nextIndex) => {
  return {
    type: 'CREATURE_REORDER',
    previousIndex,
    nextIndex
  };
};

export const createCounter = (creatureId, label) => ({
  type: 'COUNTER_CREATE',
  payload: {
    creatureId,
    counter: {
      label,
      value: 0,
      id: uuid(),
    }
  }
});
