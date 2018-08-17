import {combineReducers} from 'redux';

import {stateManagement} from './stateManagement';
import {time} from './time';

export default function (state, action) {
  return stateManagement(state, action, combineReducers({
    time,
  }));
}
