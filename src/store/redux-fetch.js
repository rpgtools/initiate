import mapKeys from 'lodash/mapKeys';
import { tokenSelector } from '../services/auth/selectors';

export const FAILED_REQUEST = 'FAILED_REQUEST';

const errorActionCreator = (error, url, init) => ({
  meta: {
    originalArgs: {
      url,
      init,
    },
  },
  type: FAILED_REQUEST,
  payload: error,
  error: true,
});

/**
 * Returns a wrapped version of fetch that:
 * - dispatches an error for failed requests (based on status codes)
 * - defaults authorization header based on store state
 *
 * @param {Store} store - redux store to integrate with
 */
const reduxFetch = store => (url, init = {}, dispatchErrors = true) => {
  const headers = mapKeys(init.headers, (v, k) => k.toLowerCase());

  if (!headers.authorization) {
    const token = tokenSelector(store.getState());
    headers.authorization = token ? `Bearer ${token}` : undefined;
  }

  return fetch(url, { ...init, headers })
    .then(response => {
      if (dispatchErrors && !response.ok) {
        store.dispatch(errorActionCreator(response, url, init));
      }
      return response;
    })
    .catch(err => {
      if (dispatchErrors) {
        store.dispatch(errorActionCreator(err, url, init));
      }
      return Promise.reject(err);
    });
};

export default reduxFetch;
