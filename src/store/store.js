import { createStore, combineReducers } from 'redux';
// import { all } from 'redux-saga/effects';
// import reduxFetch from './redux-fetch';
import { persistStore } from 'redux-pouchdb';
import * as campaign from './campaign';
import { creatures } from './creatures/reducers';
import { initiative } from './initiative/reducers';
import { modalReducer } from './modals';

const rootReducer = combineReducers({
  campaign: combineReducers({
    metadata: campaign.campaignMetadataReducer,
    creatures: creatures,
    initiative: initiative,
  }),
  modals: modalReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

persistStore(store);
export default store;
