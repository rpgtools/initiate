import { createSelector } from 'reselect';
import { creaturesByIdStateSelector } from '../../store/creatures/selectors';
import { initiativeOrderSelector } from '../../store/initiative/selectors';

export const creaturesSelector = createSelector(
  [creaturesByIdStateSelector, initiativeOrderSelector],
  (byId, orderedIds) => orderedIds.map(creatureId => byId[creatureId], [])
);
