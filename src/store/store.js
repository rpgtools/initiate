import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import reduxFetch from './redux-fetch';
import Api from '../services/api';
import * as auth from '../services/api/auth';
import * as campaign from '../services/api/campaign';
import { creatures } from './creatures/reducers';
// import { persistStore } from 'redux-pouchdb';

const sagaMiddleware = createSagaMiddleware();
const composer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancements = composer(
  applyMiddleware(sagaMiddleware),
);

const rootReducer = combineReducers({
  user: auth.userReducer,
  campaign: combineReducers({
    metadata: campaign.campaignMetadataReducer,
    creatures: creatures,
    initative: [],
  }),
  // selectedCreature: creatures.selectedCreatureReducer,
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
