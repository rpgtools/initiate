//TODO: add immutability-helper or combineReducers b/c of nesting

import {combineReducers} from 'redux';
import filter from 'lodash/filter';
import omit from 'lodash/omit';

//TODO remove arrayMove lib, import from
import { arrayMove } from 'react-sortable-hoc';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
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

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE':
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

const selectedCreature = (state = null, action) => {
  if (action.type === 'CREATURE_SELECT') {
    return action.payload.creatureId;
  } else {
    return state;
  }
};

export const creatures = combineReducers({
  byId,
  allIds,
  selected: selectedCreature,
});
