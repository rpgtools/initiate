import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage'
import rootReducer from '../reducers';

const enhancements = compose(
  applyMiddleware(thunk),
  persistState(),
)

export const store = createStore(
  rootReducer,
  {},
  enhancements
);
