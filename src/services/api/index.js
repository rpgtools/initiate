// import AuthApi from './auth/api';
import { CampaignApi } from './api/campaign';

export default class Api {
  constructor({
    apiHost = process.env.API_URL,
    fetch,
  } = {}) {
    // this.Auth = new AuthApi({ apiHost, fetch });
    this.Campaign = new CampaignApi({ apiHost, fetch });
  }
}
