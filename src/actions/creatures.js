const uuid = require('uuid/v4');

export const createCreature = creature => {
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

export const updateCreature = creature => {
  return {
    payload: {creature}
  };
};

export const deleteCreature = creature => {
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
    }
  }
});

export const updateCounter = (creatureId, counterIndex, value) => ({
  type: 'COUNTER_UPDATE',
  payload: {
    creatureId,
    counterIndex,
    value,
  }
});

export const deleteCounter = (creatureId, counterIndex) => ({
  type: 'COUNTER_DELETE',
  payload: {
    creatureId,
    counterIndex
  },
});
