import { combineReducers } from 'redux';
import { byId, allIds, selectedCreature, isCreating } from './duck';

export const creaturesReducer = combineReducers({
  byId,
  allIds,
  selected: selectedCreature,
  isCreating,
});
