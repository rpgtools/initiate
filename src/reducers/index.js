import {combineReducers} from 'redux';
import {counters} from './counters';
import {entities} from './entities';
import {stateManagement} from './stateManagement';
import {display} from './display'

export default function (state, action) {
  return stateManagement(state, action, combineReducers({
    counters,
    entities,
    display
  }));
}
