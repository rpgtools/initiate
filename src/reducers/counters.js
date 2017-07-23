import {getNextId} from '../services/identifiers.js'

export const counters = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      var nextId = getNextId(state);
      return(
        state.concat(
        {
          id: nextId,
          count: 0,
          label: action.counter.label,
        })
      );
    case 'COUNTER_UPDATE':
      var newState = state.map((counter) => {
        if(counter.id !== action.counter.id) { return(counter) }
        return(Object.assign(counter, action.counter));
      })
      return newState
    default:
      return state
  }
}
