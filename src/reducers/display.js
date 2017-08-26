import {combineReducers} from 'redux';

const layouts = (state = [], action) => {
  switch(action.type) {
    case 'LAYOUTS_UPDATE': {
      return action.layouts;
    }
    default: {
      return state;
    }
  }
};

export const display = combineReducers({layouts});
