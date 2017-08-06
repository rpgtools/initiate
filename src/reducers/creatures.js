import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    // case 'COUNTER_CREATE':
    //   return
    case 'CREATURE_CREATE':
      const { creature } = action;
      return {
        ...state,
        [creature.id]: creature
      }
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE':
      return state.concat(action.creature.id);
    default:
      return state;
  }
}

export const creatures = combineReducers({
  byId,
  allIds
});
