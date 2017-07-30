import {STATE_MANAGEMENT_ACTIONS} from '../actions';

export function stateManagement(state = [], action, appReducer) {
  switch (action.type) {
    case STATE_MANAGEMENT_ACTIONS.LOAD_STATE:
      return action.state;
    default:
      return appReducer(state, action);
  }
}
