export const creatureCreate = creature => {
  return {
    type: 'CREATURE_CREATE',
    creature
  }
}

export const creatureUpdate = creature => {
  return {
    type: 'CREATURE_UPDATE',
    creature
  }
}
