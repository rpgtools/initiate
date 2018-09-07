import * as actionTypes from './types';
import uuid from 'uuid/v4';

export const createCounter = (creatureId, label) => ({
  type: actionTypes.COUNTER_CREATE,
  payload: {
    creatureId,
    counter: {
      label,
      value: 0,
    }
  }
});

export const createCreature = name => ({
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

export const deleteCounter = (creatureId, counterIndex) => ({
  type: actionTypes.COUNTER_DELETE,
  payload: {
    creatureId,
    counterIndex,
  },
});

export const deleteCreature = creatureId => {
  return {
    type: actionTypes.CREATURE_DELETE,
    payload: { creatureId }
  };
}


export const selectCreature = creatureId => ({
  type: actionTypes.CREATURE_SELECT,
  payload: {
    creatureId,
  }
});

export const updateCreature = creature => ({
  type: actionTypes.CREATURE_UPDATE,
  payload: {creature}
});

export const updateCounter = (creatureId, counterIndex, value) => ({
  type: actionTypes.COUNTER_UPDATE,
  payload: {
    creatureId,
    counterIndex,
    value,
  }
});
