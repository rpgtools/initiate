import { createSelector } from 'reselect';
import get from 'lodash/get';
import find from 'lodash/find';

const creaturesStateSelector = state => get(state, 'creatures', {});

const creaturesByIdSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'byId', {})
);

const creaturesAllIdsSelector = createSelector(
  creaturesStateSelector,
  creatures => get(creatures, 'allIds', [])
);

const selectedCreatureStateSelector = createSelector(
  creaturesStateSelector,
  state => get(state, 'selected')
);

export const creaturesSelector = createSelector(
  creaturesByIdSelector,
  creaturesAllIdsSelector,
  (byId, allIds) => allIds.map(creatureId => byId[creatureId], [])
);

export const selectedCreatureSelector = createSelector(
  creaturesByIdSelector,
  creaturesAllIdsSelector,
  selectedCreatureStateSelector,
  (byId, allIds, selected) => selected
    ? find(byId, {id: selected})
    : find(byId, {id: allIds[0]})
);
