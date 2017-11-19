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
    type: 'CREATURE_UPDATE',
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
