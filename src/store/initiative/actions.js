import * as actionTypes from './types'

export const nextTurn = () => ({type: actionTypes.INITIATIVE_NEXT_TURN});

export const reorder = (previousIndex, nextIndex) => {
  return {
    type: actionTypes.INITIATIVE_REORDER,
    payload: {
      previousIndex,
      nextIndex
    }
  };
}

export const removeCreature = creatureId => {
  return {
    type: actionTypes.INITIATIVE_REMOVE,
    payload: {
      creatureId
    }
  }
}

export const reset = () => ({type: actionTypes.INITIATIVE_RESET});
