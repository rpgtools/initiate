import { createSelector } from 'reselect';
import 'get' from 'lodash/get';

export const campaignStateSelector = state =>
  get(state, 'campaign');
