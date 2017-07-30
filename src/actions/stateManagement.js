import {action, keysToVals} from './util';

export const ACTIONS = keysToVals({
  LOAD_STATE: null
});

export const stateLoad = state => action(ACTIONS.LOAD_STATE, {state});
