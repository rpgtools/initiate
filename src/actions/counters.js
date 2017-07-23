export const counterCreate = counter => {
  return {
    type: 'COUNTER_CREATE',
    counter
  }
}

export const counterUpdate = counter => {
  return {
    type: 'COUNTER_UPDATE',
    counter
  }
}
