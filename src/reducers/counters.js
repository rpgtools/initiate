export const counters = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return(
        state.concat(
        {
          count: 0,
          ...action.counter
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
