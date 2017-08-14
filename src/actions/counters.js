const uuid = require('uuid/v4');

export const counterCreate = counter => {
  return {
    type: 'COUNTER_CREATE',
    counter: {
      ...counter,
      id: uuid(),
      count: 0,
    }
  };
};

export const counterUpdate = counter => {
  return {
    type: 'COUNTER_UPDATE',
    counter
  };
};

export const counterDelete = counter => {
  return {
    type: 'COUNTER_DELETE',
    counter
  };
};
