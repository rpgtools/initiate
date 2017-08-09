import {combineReducers} from 'redux';
import _ from 'lodash';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return {
        ...state,
        [action.counter.id]: action.counter
      };
    case 'COUNTER_UPDATE':
      return {
        ...state,
        [action.counter.id]: {
          ...state[action.counter.id],
          ...action.counter
        }
      }
    case 'CREATURE_DELETE':
      return _.omit(state, action.creature.counterIds)
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return state.concat(action.counter.id);
    case 'CREATURE_DELETE':
      const nextState = _.without(state, action.creature.counterIds)
      console.log(state)
      console.log(action.creature.counterIds)
      return nextState
    default:
      return state;
  }
}

export const counters = combineReducers({
  byId,
  allIds
});
