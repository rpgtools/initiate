import { createSelector } from 'reselect';
import get from 'lodash/get';

const creaturesStateSelector = state => get(state, 'creatures', {});

const creaturesByIdSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

const creaturesAllIdsSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'allIds', [])
);

export const creaturesSelector = createSelector(
  creaturesByIdSelector,
  creaturesAllIdsSelector,
  (byId, allIds) => allIds.map(creatureId => byId[creatureId], [])
);
