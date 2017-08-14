import {combineReducers} from 'redux';
import _ from 'lodash';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      return {
        ...state,
        [action.counter.id]: action.counter
      };
    }
    case 'COUNTER_UPDATE': {
      let counter = action.counter;
      return {
        ...state,
        [counter.id]: {
          ...state[counter.id],
          ...counter
        }
      };
    }
    case 'COUNTER_DELETE': {
      return _.omit(state, action.counter.id);
    }
    case 'CREATURE_DELETE': {
      return _.omit(state, action.creature.counterIds);
    }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      return state.concat(action.counter.id);
    }
    case 'CREATURE_DELETE': {
      return _.difference(state, action.creature.counterIds);
    }
    case 'COUNTER_DELETE': {
      return _.remove(state, (counterId) => {
        return counterId !== action.counter.id;
      })
    }
    default: {
      return state;
    }
  }
};

export const counters = combineReducers({
  byId,
  allIds
});
