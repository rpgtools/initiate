export const counterCreate = counter => {
  return {
    type: 'COUNTER_CREATE',
    payload: {
      counter: {
        id: counter.label,
        label: counter.label,
        type: 'number',
        value: 0,
        creatureId: counter.creatureId
      }
    }
  };
};

export const counterUpdate = counter => {
  return {
    type: 'COUNTER_UPDATE',
    payload: {counter}
  };
};

export const counterDelete = counter => {
  return {
    type: 'COUNTER_DELETE',
    counter
  };
};
