import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../../services/api/campaign/selectors';

export const creaturesStateSelector = createSelector(
  campaignStateSelector,
  state => get(state, 'creatures', {})
);

export const creaturesByIdStateSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

export const creaturesAllIdsStateSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'allIds', [])
);

export const creaturesSelector = state => createSelector(
  creaturesByIdStateSelector,
  creaturesAllIdsStateSelector,
  (byId, allIds) => allIds.map(creatureId => byId[creatureId], [])
);
