import {combineReducers} from 'redux';
import _ from 'lodash';

const arrayMove = require('array-move');

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      const counter = action.payload.counter;
      const creature = state[counter.creatureId];
      return {
        ...state,
        [counter.creatureId]: {
          ...creature,
          counters: {
            ...creature.counters,
            [counter.id]: counter.value
          }
        }
      };
    }
    case 'COUNTER_DELETE': {
      const creature = state[action.payload.counter.creatureId];
      const creatureId = action.payload.counter.creatureId;
      return {
        ...state,
        [creatureId]: {
          ...creature,
          counters: _.differenceBy(creature.counters, action.payload.counter, 'id')
        }
      };
    }
    case 'COUNTER_UPDATE': {
      const counter = action.payload.counter
      const creature = state[counter.creatureId];
      return {
        ...state,
        [counter.creatureId]: {
          ...creature,
          counters: {
            ...creature.counters,
            [counter.id]: counter.value
          }
        }
      }
    }
    case 'CREATURE_CREATE': {
      const creature = action.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case 'CREATURE_DELETE': {
      const creature = action.creature;
      return _.omit(state, creature.id);
    }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
      return state.concat(action.creature.id);
    }
    case 'CREATURE_DELETE': {
      return _.remove(state, (creatureId) => {
          return creatureId !== action.creature.id;
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
