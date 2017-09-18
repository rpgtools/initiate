import {combineReducers} from 'redux';
import _ from 'lodash';


const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      const entity = state[action.counter.entityId];
      const entityId = action.counter.entityId;
      return {
        ...state,
        [entityId]: {
          ...entity,
          counterIds: [
            ...entity.counterIds,
            action.counter.id
          ]
        }
      };
    }
    case 'COUNTER_DELETE': {
      const entity = state[action.counter.entityId];
      const entityId = action.counter.entityId;
      return {
        ...state,
        [entityId]: {
          ...entity,
          counterIds: _.difference(entity.counterIds, action.counter.id)
        }
      };
    }
    case 'ENTITY_CREATE': {
      const entity = action.entity;
      return {
        ...state,
        [entity.id]: entity
      };
    }
    case 'ENTITY_DELETE': {
      const entity = action.entity;
      return _.omit(state, entity.id);
    }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'ENTITY_CREATE': {
      return state.concat(action.entity.id);
    }
    case 'ENTITY_DELETE': {
      return _.remove(state, (entityId) => {
          return entityId !== action.entity.id;
        });
    }
    // case 'ENTITY_REORDER': {
    //   const { previousIndex, nextIndex } = action;
    //   return arrayMove(state, previousIndex, nextIndex);
    // }
    default: {
      return state;
    }
  }
};

export const entities = combineReducers({
  byId,
  allIds
});
