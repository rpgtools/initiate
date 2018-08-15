import PropTypes from 'prop-types';

export default class AuthApi {
  static asUserFromToken = PropTypes.object.isRequired;

  constructor({ apiHost, fetch }) {
    this.apiHost = apiHost;
    this.fetch = fetch;
  }

  // login = ({ username, password }) =>
}
