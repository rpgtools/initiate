import { createStore, combineReducers } from 'redux';
// import { all } from 'redux-saga/effects';
// import reduxFetch from './redux-fetch';
import { persistStore } from 'redux-pouchdb';
import * as campaign from './campaign';
import { creatures } from './creatures/reducers';
import { initiative } from './initiative/reducers';

const rootReducer = combineReducers({
  campaign: combineReducers({
    metadata: campaign.campaignMetadataReducer,
    creatures: creatures,
    initiative: initiative,
  }),
});

const store = createStore(rootReducer);

persistStore(store);
export default store;
