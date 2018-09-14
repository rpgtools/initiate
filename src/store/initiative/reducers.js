import * as actionTypes from './types'
import * as creatureActionTypes from '../creatures/types'
import { arrayMove } from 'react-sortable-hoc';
import { persistentDocumentReducer } from 'redux-pouchdb';
import { db } from '../pouch';

const initiativeReducer = (state = {}, action) => {
  switch(action.type) {
    case creatureActionTypes.CREATURE_CREATE:
    if (state.order) {
      const lastCreatureIndex = state.order.length - state.turn + 1;
      return {
        ...state,
        order: [
          ...state.order.slice(0, lastCreatureIndex),
          action.payload.creature.id,
          ...state.order.slice(lastCreatureIndex)
        ]
      }
    } else {
      return {
        ...state,
        order: [action.payload.creature.id]
      }
    }
    case actionTypes.INITIATIVE_REMOVE:
      return {
        ...state,
        order: state.order.filter(
          (creatureId) => creatureId !== action.payload.creatureId
        )
      };
    case actionTypes.INITIATIVE_RESET_TURN:
      return {
        ...state,
        turn: 1,
        round: 1
      };
    case actionTypes.INITIATIVE_RESET_ALL:
      return {
        ...state,
        turn: 1,
        round: 1,
        initiative: [],
      };
    case actionTypes.INITIATIVE_REORDER: {
      const { previousIndex, nextIndex } = action.payload;
      if (state.length === 0) {
        return state;
      } else {
        return {
          ...state,
          order: arrayMove(state.order, previousIndex, nextIndex)
        }
      }
    }
    case actionTypes.INITIATIVE_NEXT_TURN: {
      if (state.order.length === 0) {
        return state;
      } else {
        const nextState = {
          ...state,
          order: arrayMove(state.order, 0, state.order.length - 1)
        };
        const turn = (state.turn) ? state.turn : 1,
              round = (state.round) ? state.round : 1;
        if (turn === state.order.length) {
          return {
            ...nextState,
            turn: 1,
            round: round + 1,
          }
        } else {
          return {
            ...nextState,
            turn: turn + 1,
          }
        }
      }
    }
    default:
      return state;
  }
};

const persistentInitiativeReducer = persistentDocumentReducer(db, "initiative")(initiativeReducer);
export const initiative = persistentInitiativeReducer;
