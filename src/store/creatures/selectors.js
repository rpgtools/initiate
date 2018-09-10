import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../campaign/selectors';

export const creaturesStateSelector = createSelector(
  campaignStateSelector,
  state => get(state, 'creatures', {})
);

export const creaturesByIdStateSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

export const creaturesAllIdsSelector = createSelector(
  creaturesByIdStateSelector,
  creatures => Object.keys(creatures)
);
