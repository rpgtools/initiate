// import AuthApi from './auth/api';
import CampaignsApi from '.campaigns/api';

export default class Api {
  constructor({
    apiHost = process.env.API_URL,
    fetch,
  } = {}) {
    // this.Auth = new AuthApi({ apiHost, fetch });
    this.Campaigns = new CampaignsApi({ apiHost, fetch });
  }
}
