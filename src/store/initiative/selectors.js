import { createSelector } from 'reselect';
import get from 'lodash/get';
import { campaignStateSelector } from '../campaign/selectors';

export const initiativeStateSelector = createSelector(
  campaignStateSelector,
  campaign => get(campaign, 'initiative', {})
);

export const initiativeOrderSelector = createSelector(
  initiativeStateSelector,
  initiative => get(initiative, 'initiativeOrder', [])
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
  initiativeTurnSelector,
  initiativeSizeSelector,
  (turn, size) => {
    const length = (size > 0) ? size : 1; //prevent NaN
    return Math.floor(turn/length);
  }
);
