import { combineReducers } from 'redux';
import { counters } from './counters';
import { creatures } from './creatures';

export default combineReducers({
    counters,
    creatures,
});
