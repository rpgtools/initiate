export const creatures = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE':
      return state.concat(action.creature);
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
