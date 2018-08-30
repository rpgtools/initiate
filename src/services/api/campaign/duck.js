import { makeApiServiceActionTypes } from '../../util';

export const actionTypes = {
  ...makeApiServiceActionTypes('GET_CAMPAIGN', 'campaign/GET'),
  POST_CAMPAIGN: 'campaign/POST',
  POST_CAMPAIGN_ERROR: 'campaign/POST_ERROR',
};

const initialState = {
  id: 'first campaign id',
  name: null,
  timestamp: null,
};

export const campaignMetadataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CAMPAIGN:
      return state;
    case actionTypes.POST_CAMPAIGN:
      return state;
    case actionTypes.GET_CAMPAIGN_RESPONSE:
      return state;
    default:
      return state;
  }
};

export const actions = {
  getCampaignResponse: campaign => ({
    type: actionTypes.GET_CAMPAIGN_RESPONSE,
    payload: campaign,
  }),
};
