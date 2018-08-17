import {
  call,
  put,
  takeEvery,
  takeLatest,
  cancelled,
} from 'redux-saga/effects';

import { actions, actionTypes } from './duck';

export function getCampaignSagaFactory({ getCampaign }) {
  return function*({ payload }) {
    try {

    } catch (error) {

    }
  }
}

export function rootSaga({ api, logger }) {
  return [
    takeLatest(
      actionTypes.GET_CAMPAIGN,
      getCampaignSagaFactory(api.Campaign)
    )
  ]
}
