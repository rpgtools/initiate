import {combineReducers} from 'redux';
import _ from 'lodash';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      let counter = action.payload.counter;
      return {
        ...state,
        [counter.id]: {
          id: counter.id,
          label: counter.label,
          type: counter.type
        }
      };
    }
    // case 'COUNTER_UPDATE': {
    //   let counter = action.payload.counter;
    //   return {
    //     ...state,
    //     [counter.id]: {
    //       ...state[counter.id],
    //       ...counter
    //     }
    //   };
    // }
    // case 'COUNTER_DELETE': {
    //   return _.omit(state, action.payload.counter.id);
    // }
    // case 'CREATURE_DELETE': {
    //   return _.omit(state, action.creature.counterIds);
    // }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      return state.concat(action.payload.counter.id);
    }
    // case 'CREATURE_DELETE': {
    //   return _.difference(state, action.creature.counters);
    // }
    // case 'COUNTER_DELETE': {
    //   return _.remove(state, (counterId) => {
    //     return counterId !== action.payload.counter.id;
    //   })
    // }
    default: {
      return state;
    }
  }
};

export const counters = combineReducers({
  byId,
  allIds
});
