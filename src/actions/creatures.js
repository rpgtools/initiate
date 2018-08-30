const uuid = require('uuid/v4');

export const createCreature = name => {
  return {
    type: 'CREATURE_CREATE',
    payload: {
      creature: {
        name: name,
        id: uuid(),
        counters: [
          {label: "HP", value:0}
        ],
      },
    }
  };
}

export const updateCreature = creature => {
  return {
    type: 'CREATURE_UPDATE',
    payload: {creature}
  }
}

export const deleteCreature = creatureId => {
  return {
    type: 'CREATURE_DELETE',
    payload: { creatureId }
  };
};

export const reorderCreatures = (previousIndex, nextIndex) => {
  return {
    type: 'CREATURE_REORDER',
    payload: {
      previousIndex,
      nextIndex
    }
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
    counterIndex,
  },
});

export const selectCreature = creatureId => ({
  type: 'CREATURE_SELECT',
  payload: {
    creatureId,
  }
});
