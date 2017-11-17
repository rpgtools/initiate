export const counterCreate = counter => {
  console.log(counter);
  return {
    type: 'COUNTER_CREATE',
    payload: {
      counter: {
        ...counter,
        id: uuid(),
        type: 'number',
        value: 0,
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
