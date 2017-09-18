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

const editing_layout = (state = false, action) => {
  switch(action.type) {
    case 'LAYOUTS_EDIT_TOGGLE': {
      return !state;
    }
    default: {
      return state;
    }
  }
}

const initiative = (state = [], action) => {
  switch(action.type) {
    case 'REORDER_TOKENS': {

    }
    default: {
      return state;
    }
  }
}

export const display = combineReducers({layouts,editing_layout});
