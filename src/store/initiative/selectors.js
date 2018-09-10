import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../campaign/selectors';

export const initiativeStateSelector = createSelector(
  campaignStateSelector,
  campaign => get(campaign, 'initiative', {})
);

export const initiativeOrderSelector = createSelector(
  initiativeStateSelector,
  initiative => get(initiative, 'order', [])
);

export const initiativeTurnSelector = createSelector(
  initiativeStateSelector,
  initiative => get(initiative, 'turn', 0)
);

export const initiativeSizeSelector = createSelector(
  initiativeOrderSelector,
  initiative => initiative.length
);

export const initiativeRoundSelector = createSelector(
  initiativeStateSelector,
  initiative => get(initiative, 'round', 0)
);
