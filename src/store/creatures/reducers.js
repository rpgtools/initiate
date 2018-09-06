import filter from 'lodash/filter';
import omit from 'lodash/omit';
import { arrayMove } from 'react-sortable-hoc';
import * as actionTypes from "./types";
import { combineReducers } from 'redux';

// Reducers -------------------------------------
const byId = (state = {}, action) => {
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

const allIds = (state = [], action) => {
  switch(action.type) {
    case actionTypes.CREATURE_CREATE:
      return state.concat(action.payload.creature.id);
    case actionTypes.CREATURE_DELETE:
      return filter(state, creatureId =>
        creatureId !== action.payload.creatureId);
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

export const creatures = combineReducers({
  allIds,
  byId,
});
