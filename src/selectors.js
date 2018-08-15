import { createSelector } from 'reselect';
import get from 'lodash/get';

const userStateSelector = state => get(state, 'user');

const userSelector = createSelector(
  userStateSelector,
  user => user._id ? user : null
  // TODO: add guest login
)

export { userSelector };
