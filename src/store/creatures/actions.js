import actionTypes from './types';
import uuid from 'uuid/v4';

const createCounter = (creatureId, label) => ({
  type: actionTypes.COUNTER_CREATE,
  payload: {
    creatureId,
    counter: {
      label,
      value: 0,
    }
  }
});

const createCreature = name => ({
  type: actionTypes.CREATURE_CREATE,
  payload: {
    creature: {
      name,
      id: uuid(),
      counters: [
        {label: "HP", value:0}
      ],
    },
  }
});

const deleteCounter = (creatureId, counterIndex) => ({
  type: actionTypes.COUNTER_DELETE,
  payload: {
    creatureId,
    counterIndex,
  },
});

const deleteCreature = creatureId => {
  return {
    type: actionTypes.CREATURE_DELETE,
    payload: { creatureId }
  };
}

const reorderCreatures = (previousIndex, nextIndex) => {
  return {
    type: actionTypes.CREATURE_REORDER,
    payload: {
      previousIndex,
      nextIndex
    }
  };
}

const selectCreature = creatureId => ({
  type: actionTypes.CREATURE_SELECT,
  payload: {
    creatureId,
  }
});

const updateCreature = creature => {
  return {
    payload: {creature}
  };
}

const updateCounter = (creatureId, counterIndex, value) => ({
  type: actionTypes.COUNTER_UPDATE,
  payload: {
    creatureId,
    counterIndex,
    value,
  }
});

export default {
  createCounter,
  createCreature,
  deleteCounter,
  deleteCreature,
  reorderCreatures,
  selectCreature,
  updateCounter,
  updateCreature,
}
