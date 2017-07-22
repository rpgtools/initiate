let nextCounterId = 0
export const counterCreate = counter => {
  return {
    type: 'COUNTER_CREATE',
    id: nextCounterId++,
    counter
  }
}

export const counterUpdate = counter => {
  return {
    type: 'COUNTER_UPDATE',
    counter
  }
}
