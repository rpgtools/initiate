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
    default: {
      return state;
    }
  }
};

export const counters = combineReducers({
  byId,
  allIds
});
