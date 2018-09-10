import PropTypes from 'prop-types';
import { check } from '../../util';

export default class CampaignApi {
  static asCampaignData = PropTypes.object.isRequired;

  constructor({ apiHost, fetch }) {
    this.apiHost = apiHost;
    this.fetch = fetch;
  };

  getCampaign = campaignId => {
    this.fetch(`${this.apiHost}/campaigns/${campaignId}`, { method: 'GET' }).then(
      check(CampaignApi.asCampaignData, 'Campaigns Api: getCampaign')
    );
  };
}
