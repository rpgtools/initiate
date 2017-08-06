const uuid = require('uuid/v4');

export const creatureCreate = creature => {
  return {
    type: 'CREATURE_CREATE',
    creature: {
      id: uuid(),
      ...creature
    }
  }
}

export const creatureUpdate = creature => {
  return {
    type: 'CREATURE_UPDATE',
    creature
  }
}
