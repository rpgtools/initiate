import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../../services/api/campaign/selectors';

export const campaignCreaturesStateSelector = createSelector(
  campaignStateSelector,
  state => get(state, 'creatures', {})
);

export const campaignCreaturesByIdStateSelector = createSelector(
  campaignCreaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

export const campaignCreaturesAllIdsStateSelector = createSelector(
  campaignCreaturesStateSelector,
  creatures => get(creatures, 'allIds', [])
);

export const selectedCreatureStateSelector = state =>
  get(state, 'selectedCreature');
