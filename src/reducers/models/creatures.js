import {combineReducers} from 'redux';
import _ from 'lodash';

const arrayMove = require('array-move');

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
      const creature = action.payload.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case 'CREATURE_DELETE': {
      const creature = action.payload.creature;
      return _.omit(state, creature.id);
    }
    case 'CREATURE_UPDATE': {
      return {
        ...state,
        [action.payload.creature.id]: {
          ...state[action.payload.creature.id],
          ...action.payload.creature,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
      return state.concat(action.payload.creature.id);
    }
    case 'CREATURE_DELETE': {
      return _.remove(state, (creatureId) => {
        return creatureId !== action.payload.creature.id;
      });
    }
    case 'CREATURE_REORDER': {
      const { previousIndex, nextIndex } = action;
      return arrayMove(state, previousIndex, nextIndex);
    }
    default: {
      return state;
    }
  }
};

export const creatures = combineReducers({
  byId,
  allIds
});
