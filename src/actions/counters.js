const uuid = require('uuid/v4');

export const counterCreate = counter => {
  return {
    type: 'COUNTER_CREATE',
    counter: {
      id: uuid(),
      ...counter
    }
  }
}

export const counterUpdate = counter => {
  return {
    type: 'COUNTER_UPDATE',
    counter
  }
}
