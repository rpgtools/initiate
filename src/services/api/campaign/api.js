import PropTypes from 'prop-types';

export default class CampaignApi {
  static asCampaignData = PropTypes.object.isRequired;

  constructor({ apiHost, fetch }) {
    this.apiHost = apiHost,
    this.fetch = fetch,
  };

  getCampaign = campaignId =>
    this.fetch(`${this.apiHost}/campaigns/${campaignId}`, { method: 'GET' }).then(
      CampaignApi.asCampaignData
    );

  postCampain = campaignData => {};
}
