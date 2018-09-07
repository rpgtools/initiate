import * as actionTypes from './types'
import * as creatureActionTypes from '../creatures/types'
import { arrayMove } from 'react-sortable-hoc';
import { persistentDocumentReducer } from 'redux-pouchdb';
import { db } from '../pouch';

const initiativeReducer = (state = {}, action) => {
  switch(action.type) {
    case creatureActionTypes.CREATURE_CREATE:
      const newInitiativeOrder =
        (state.initiativeOrder)
          ? state.initiativeOrder.concat(action.payload.creature.id)
          : [action.payload.creature.id];
      return {
        ...state,
        initiativeOrder: newInitiativeOrder,
      };
    case actionTypes.INITIATIVE_REMOVE:
      return {
        ...state,
        initiativeOrder: state.initiativeOrder.filter(
          (creatureId) => creatureId !== action.payload.creatureId
        )
      };
    case actionTypes.INITIATIVE_RESET:
      return {
        ...state,
        turn: 0
      };
    case actionTypes.INITIATIVE_REORDER: {
      const { previousIndex, nextIndex } = action.payload;
      if (state.length === 0) {
        return state;
      } else {
        return {
          ...state,
          initiativeOrder: arrayMove(state.initiativeOrder, previousIndex, nextIndex)
        }
      }
    }
    case actionTypes.INITIATIVE_NEXT_TURN: {
      if (state.initiativeOrder.length === 0) {
        return state;
      } else {
        const turn = (state.turn) ? state.turn : 0;
        return {
          ...state,
          turn: turn + 1,
          initiativeOrder: arrayMove(state.initiativeOrder, 0, state.initiativeOrder.length-1)
        }
      }
    }
    default:
      return state;
  }
};

const persistentInitiativeReducer = persistentDocumentReducer(db, "initiative")(initiativeReducer);
export const initiative = persistentInitiativeReducer;
