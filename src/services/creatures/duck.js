import filter from 'lodash/filter';
import omit from 'lodash/omit';
import { arrayMove } from 'react-sortable-hoc';

export const byId = (state = {}, action) => {
  switch(action.type) {
    case 'CREATURE_CREATE_SUBMIT': {
      const creature = action.payload.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case 'CREATURE_DELETE':
      return omit(state, action.payload.creatureId);
    case 'CREATURE_UPDATE':
      return {
        ...state,
        [action.payload.creature.id]: {
          ...state[action.payload.creature.id],
          ...action.payload.creature,
        },
      };
    case 'COUNTER_CREATE':
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
    case 'COUNTER_DELETE':
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
    case 'COUNTER_UPDATE':
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

export const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE_SUBMIT':
      return state.concat(action.payload.creature.id);
    case 'CREATURE_DELETE':
      return filter(state, creatureId =>
        creatureId !== action.payload.creatureId);
    case 'CREATURE_REORDER': {
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

export const selectedCreature = (state = null, action) => {
  if (action.type === 'CREATURE_SELECT') {
    return action.payload.creatureId;
  } else {
    return state;
  }
};

export const isCreating = (state = false, { type }) => {
  if (type === 'CREATURE_CREATE_INIT') {
    return true;
  } else if (type === 'CREATURE_CREATE_SUBMIT' || 'CREATURE_CREATE_CANCEL') {
    return false;
  } else {
    return state;
  }
};
