//TODO: add immutability-helper?

import {combineReducers} from 'redux';
import _ from 'lodash';

const arrayMove = require('array-move');

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
      const creature = action.payload.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case 'CREATURE_DELETE': {
      const creature = action.payload.creature;
      return _.omit(state, creature.id);
    }
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
    case 'COUNTER_UPDATE':
      return {
        ...state,
        [action.payload.creatureId]: {
          ...state[action.payload.creatureId],
          counters: state[action.payload.creatureId].counters.map((counter, index) =>
            index === action.payload.counterId
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
    case 'CREATURE_CREATE': {
      return state.concat(action.payload.creature.id);
    }
    case 'CREATURE_DELETE': {
      return _.remove(state, (creatureId) => {
        return creatureId !== action.payload.creature.id;
      });
    }
    case 'CREATURE_REORDER': {
      const { previousIndex, nextIndex } = action;
      return arrayMove(state, previousIndex, nextIndex);
    }
    default: {
      return state;
    }
  }
};

export const creatures = combineReducers({
  byId,
  allIds
});
