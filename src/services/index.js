import AuthApi from '../auth';

export default class Api {
  constructor({
    apiHost = process.env.API_URL,
    fetch,
  } = {}) {
    this.Auth = new AuthApi({ apiHost, fetch });
  }
}
