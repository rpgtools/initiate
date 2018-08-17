import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage'
import { all } from 'redux-saga/effects';
import reduxFetch from './redux-fetch';
import Api from '../services/api';
import { * as auth } from '../services/api/auth';
import { * as campaign } from '../services/api/campaign';
import { * as creatures } from '../services/creatures';

const sagaMiddleware = createSagaMiddleware();
const composer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancements = composer(
  applyMiddleware(sagaMiddleware),
  persistState(),
);

const rootReducer = combineReducers({
  user: auth.userReducer,
  campaign: combineReducers({
    metadata: campaign.campaignMetadataReducer,
    selectedCreature: creatures.selectedCreatureReducer,
    creatures: combineReducers({
      byIds: creatures.byIdReducer,
      allIds: creatures.allIdsReducer,
    }),
  }),
  isCreatingCreature: creatures.isCreatingReducer,
  // isCreatingCampaign: campaign.isCreatingReducer,
});

const store = createStore(
  rootReducer,
  enhancements
);

const api = new Api({
  fetch: reduxFetch(store),
});

const sagaInjections = {
  api,
  dispatch: store.dispatch.bind(store),
  logger: window.console,
  window,
};

function* rootSaga() {
  yield all([
    ...campaign.campaignRootSaga(sagaInjections),
  ]);
};

sagaMiddleware.run(rootSaga);

export default store;
