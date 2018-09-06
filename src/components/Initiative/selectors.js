import { createSelector } from 'reselect';
import find from 'lodash/find';
import {
  creaturesByIdStateSelector,
  creaturesAllIdsStateSelector,
} from '../../store/creatures/selectors';

export const creaturesSelector = createSelector(
  creaturesByIdStateSelector,
  creaturesAllIdsStateSelector,
  (byId, allIds) => allIds.map(creatureId => byId[creatureId], [])
);
