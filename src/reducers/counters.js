export const counters = (state = [], action) => {
  switch(action.type) {
    case 'COUNTER_CREATE':
      return(
        state.concat(
        {
          id: action.id,
          value: 0,
          label: action.counter.label,
        })
      );
    default:
      return state
  }
}
