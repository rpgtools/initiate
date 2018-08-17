import {
  call,
  put,
  takeLatest,
  cancelled,
  select,
} from 'redux-saga/effects';

import { actions, actionTypes } from './duck';
import { campaignStateSelector } from './selectors';

export function getCampaignSagaFactory({ getCampaign }) {
  return function*({ payload }) {
    try {
      yield put({ type: actionTypes.GET_CAMPAIGN_REQUEST });
      const response = yield call(getCampaign, payload.campaignId)
      yield put(actions.getCampaignResponse(response));
      return response;
    } catch (error) {
      yield put({ type: actionTypes.GET_CAMPAIGN_ERROR });
    } finally {
      if (yield cancelled()) {
        yield put({ type: actionTypes.GET_CAMPAIGN_CANCELLED });
      }
    }
  };
}

export function postCampaignSagaFactory({ postCampaign }, logger) {
  return function*({ payload }) {
    try {
      const campaign = select(campaignStateSelector);
      yield call(postCampaign, campaign);
    } catch (error) {
      yield put({ type: actionTypes.POST_CAMPAIGN_ERROR });
      yield call([logger, 'console'], actionTypes.POST_CAMPAIGN_ERROR, error);
    };
  }
}

export default function rootSaga({ api, logger }) {
  return [
    takeLatest(
      actionTypes.GET_CAMPAIGN,
      getCampaignSagaFactory(api.Campaign)
    ),
    takeLatest(
      actionTypes.POST_CAMPAIGN,
      postCampaignSagaFactory(api.Campaign, logger)
    ),
  ];
}
