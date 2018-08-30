import { createSelector } from 'reselect';
import find from 'lodash/find';
import {
  campaignCreaturesByIdStateSelector,
  campaignCreaturesAllIdsStateSelector,
  selectedCreatureStateSelector,
} from '../../services/creatures/selectors';

export const creaturesSelector = createSelector(
  campaignCreaturesByIdStateSelector,
  campaignCreaturesAllIdsStateSelector,
  (byId, allIds) => allIds.map(creatureId => byId[creatureId], [])
);

export const selectedCreatureSelector = createSelector(
  campaignCreaturesByIdStateSelector,
  campaignCreaturesAllIdsStateSelector,
  selectedCreatureStateSelector,
  (byId, allIds, selected) => selected
    ? find(byId, {id: selected})
    : find(byId, {id: allIds[0]})
);
