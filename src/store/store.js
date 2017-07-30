import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'
import rootReducer from '../reducers';

const composer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancements = composer(
  applyMiddleware(thunk),
  persistState(),
);

export const store = createStore(
  rootReducer,
  {},
  enhancements
);
