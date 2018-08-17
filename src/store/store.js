import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage'
import { all } from 'redux-saga/effects';
import reduxFetch from './redux-fetch';
import Api from '../services';
import rootReducer from '../reducers';
import campaign from '../services/campaign';

const sagaMiddleware = createSagaMiddleware()
const composer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancements = composer(
  applyMiddleware(sagaMiddleware),
  persistState(),
);

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
    ...campaign.campaignSaga(sagaInjections),
  ]);
};

sagaMiddleware.run(rootSaga);

export default store;
