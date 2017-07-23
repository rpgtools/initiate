import {getNextId} from '../services/identifiers.js'

export const creatures = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE':
      var nextId = getNextId(state);
      return(
        state.concat(
        {
          id: nextId,
          name: action.creature.name,
        })
      );
    case 'CREATURE_UPDATE':
      var newState = state.map((creature) => {
        if(creature.id !== action.creature.id) { return(creature) }
        return(Object.assign(creature, action.creature));
      })
      return newState
    default:
      return state
  }
}
