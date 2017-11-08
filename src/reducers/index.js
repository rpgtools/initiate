import {combineReducers} from 'redux';

import {counters} from './models/counters';
import {creatures} from './models/creatures';
import {stateManagement} from './stateManagement';
import {time} from './time';

export default function (state, action) {
  return stateManagement(state, action, combineReducers({
    counters,
    creatures,
    time,
  }));
}
