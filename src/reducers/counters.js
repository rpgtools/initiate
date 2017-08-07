import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return {
        ...state,
        [action.counter.id]: action.counter
      };
    case 'COUNTER_UPDATE':
      var result = {
        ...state,
        [action.counter.id]: {
          ...state[action.counter.id],
          ...action.counter
        }
      }
      console.log(result)
      return result
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return state.concat(action.counter.id);
    default:
      return state;
  }
}

export const counters = combineReducers({
  byId,
  allIds
});
