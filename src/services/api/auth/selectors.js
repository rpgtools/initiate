import { createSelector } from 'reselect';
import get from 'lodash/get';

export const userStateSelector = state => get(state, 'user');

export const userSelector = createSelector(
  userStateSelector,
  user => user // TODO: add guest login
);

export const tokenSelector = createSelector(
  userSelector,
  user => get(user, 'token')
);
