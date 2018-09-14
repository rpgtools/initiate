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

export const resetTurn = () => ({type: actionTypes.INITIATIVE_RESET_TURN});
export const resetAll = () => ({type: actionTypes.INITIATIVE_RESET_ALL});
