import { createSelector } from 'reselect';
import * as initiativeSelectors from '../../store/initiative/selectors';

export const roundSelector = createSelector(
  initiativeSelectors.initiativeRoundSelector,
  (round) => round + 1 //do math on 0-index, display 1-index
);

export const turnSelector = createSelector(
  [
    initiativeSelectors.initiativeTurnSelector,
    initiativeSelectors.initiativeSizeSelector,
  ],
  (turn, size) => (turn % size) + 1
);
