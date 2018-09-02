import filter from 'lodash/filter';
import omit from 'lodash/omit';
import { arrayMove } from 'react-sortable-hoc';
import actionTypes from "./types";

// Reducers -------------------------------------
const byIdReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.CREATURE_CREATE: {
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

const allIdsReducer = (state = [], action) => {
  switch(action.type) {
    case actionTypes.CREATURE_CREATE:
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

const selectedCreatureReducer = (state = null, action) => {
  if (action.type === actionTypes.CREATURE_SELECT) {
    return action.payload.creatureId;
  } else {
    return state;
  }
};

export default {
  byIdReducer,
  allIdsReducer,
  selectedCreatureReducer,
}
