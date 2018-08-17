import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../api/campaign';

export const campaignCreaturesStateSelector = createSelector(
  campaignStateSelector,
  state => get(state, 'creatures', {});
);

export const campaignCreaturesByIdStateSelector = createSelector(
  campaignCreaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

export const campaignCreaturesAllIdsStateSelector = createSelector(
  campaignCreaturesStateSelector,
  creatures => get(creatures, 'allIds', [])
);

export const selectedCreatureStateSelector = createSelector(
  campaignCreaturesStateSelector,
  state => get(state, 'selectedCreature')
);
