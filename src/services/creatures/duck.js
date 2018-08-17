import filter from 'lodash/filter';
import omit from 'lodash/omit';
import { arrayMove } from 'react-sortable-hoc';
import uuid from 'uuid/v4';

// ActionTypes ----------------------------------'

export const actionTypes = {
  CREATURE_CREATE_INIT: 'creature/CREATE_INIT',
  CREATURE_CREATE_SUBMIT: 'creature/CREATE_SUBMIT',
  CREATURE_CREATE_CANCEL: 'creature/CREATE_CANCEL',
  CREATURE_DELETE: 'creature/DELETE',
  CREATURE_UPDATE: 'creature/UPDATE',
  CREATURE_SELECT: 'creature/SELECT',
  CREATURE_REORDER: 'creature/REORDER',
  COUNTER_CREATE: 'counter/CREATE',
  COUNTER_DELETE: 'counter/DELETE',
  COUNTER_UPDATE: 'counter/UPDATE',
};

// Reducers -------------------------------------
export const byIdReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.CREATURE_CREATE_SUBMIT: {
      const creature = action.payload.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case actionTypes.CREATURE_DELETE:
      return omit(state, action.payload.creatureId);
    case actionTypes.CREATURE_UPDATE:
      return {
        ...state,
        [action.payload.creature.id]: {
          ...state[action.payload.creature.id],
          ...action.payload.creature,
        },
      };
    case actionTypes.COUNTER_CREATE:
      return {
        ...state,
        [action.payload.creatureId]: {
          ...state[action.payload.creatureId],
          counters: [
            ...state[action.payload.creatureId].counters,
            action.payload.counter,
          ]
        }
      };
    case actionTypes.COUNTER_DELETE:
      return {
        ...state,
        [action.payload.creatureId]: {
          ...state[action.payload.creatureId],
          counters: [
            ...state[action.payload.creatureId].counters.slice(0, action.payload.counterIndex),
            ...state[action.payload.creatureId].counters.slice(action.payload.counterIndex + 1)
          ]
        }
      }
    case actionTypes.COUNTER_UPDATE:
      return {
        ...state,
        [action.payload.creatureId]: {
          ...state[action.payload.creatureId],
          counters: state[action.payload.creatureId].counters.map((counter, index) =>
            index === action.payload.counterIndex
              ? {...counter, value: action.payload.value}
              : counter
            )
        }
      };
    default: {
      return state;
    }
  }
};

export const allIdsReducer = (state = [], action) => {
  switch(action.type) {
    case actionTypes.CREATURE_CREATE_SUBMIT:
      return state.concat(action.payload.creature.id);
    case actionTypes.CREATURE_DELETE:
      return filter(state, creatureId =>
        creatureId !== action.payload.creatureId);
    case actionTypes.CREATURE_REORDER: {
      const { previousIndex, nextIndex } = action.payload;
      if (state.length === 0) {
        return state;
      } else {
        return arrayMove(state, previousIndex, nextIndex);
      }
    }
    default:
      return state;
  }
};

export const selectedCreatureReducer = (state = null, action) => {
  if (action.type === actionTypes.CREATURE_SELECT) {
    return action.payload.creatureId;
  } else {
    return state;
  }
};

export const isCreatingReducer = (state = false, { type }) => {
  if (type === actionTypes.CREATURE_CREATE_INIT) {
    return true;
  } else if (type === actionTypes.CREATURE_CREATE_SUBMIT || actionTypes.CREATURE_CREATE_CANCEL) {
    return false;
  } else {
    return state;
  }
};

// Actions --------------------------------------

export const actions = {
  initCreateCreature: () => ({
    type: actionTypes.CREATURE_CREATE_INIT
  }),
  cancelCreateCreature: () => ({
    type: actionTypes.CREATURE_CREATE_CANCEL
  }),
  submitCreateCreature: name => ({
    type: actionTypes.CREATURE_CREATE_SUBMIT,
    payload: {
      creature: {
        name,
        id: uuid(),
        counters: [],
      },
    }
  }),
  updateCreature: creature => {
    return {
      payload: {creature}
    };
  },
  deleteCreature: creatureId => {
    return {
      type: actionTypes.CREATURE_DELETE,
      payload: { creatureId }
    };
  },
  reorderCreatures: (previousIndex, nextIndex) => {
    return {
      type: actionTypes.CREATURE_REORDER,
      payload: {
        previousIndex,
        nextIndex
      }
    };
  },
  createCounter: (creatureId, label) => ({
    type: actionTypes.COUNTER_CREATE,
    payload: {
      creatureId,
      counter: {
        label,
        value: 0,
      }
    }
  }),
  updateCounter: (creatureId, counterIndex, value) => ({
    type: actionTypes.COUNTER_UPDATE,
    payload: {
      creatureId,
      counterIndex,
      value,
    }
  }),
  deleteCounter: (creatureId, counterIndex) => ({
    type: actionTypes.COUNTER_DELETE,
    payload: {
      creatureId,
      counterIndex,
    },
  }),
  selectCreature: creatureId => ({
    type: actionTypes.CREATURE_SELECT,
    payload: {
      creatureId,
    }
  }),
}
