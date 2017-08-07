import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      const creature = state[action.counter.creatureId]
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
    case 'CREATURE_CREATE':
      return {
        ...state,
        [action.creature.id]: action.creature
      };
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
