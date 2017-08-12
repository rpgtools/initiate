import {combineReducers} from 'redux';
import _ from 'lodash';

const arrayMove = require('array-move');

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      var creature = state[action.counter.creatureId]
      return {
        ...state,
        [action.counter.creatureId]: {
          ...creature,
          counterIds: [
            ...creature.counterIds,
            action.counter.id
          ]
        }
      };
    case 'COUNTER_DELETE':
      var creature = state[action.counter.creatureId]
      return {
        ...state,
        [action.counter.creatureId]: {
          ...creature,
          counterIds: _.difference(creature.counterIds, action.counter.id)
        }
      };
    case 'CREATURE_CREATE':
      return {
        ...state,
        [action.creature.id]: action.creature
      };
    case 'CREATURE_DELETE':
      return _.omit(state, action.creature.id);
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE':
      return state.concat(action.creature.id);
    case 'CREATURE_DELETE':
      return _.remove(state, (creatureId) => {
          return creatureId !== action.creature.id
        })
    case 'CREATURE_REORDER':
      return arrayMove(state, action.previousIndex, action.nextIndex)
    default:
      return state;
  }
}

export const creatures = combineReducers({
  byId,
  allIds
});
