// import AuthApi from './auth/api';
import { CampaignApi } from './campaign';

export default class Api {
  constructor({
    apiHost = 'http://localhost:3001',
    fetch,
  } = {}) {
    // this.Auth = new AuthApi({ apiHost, fetch });
    this.Campaign = new CampaignApi({ apiHost, fetch });
  }
}
