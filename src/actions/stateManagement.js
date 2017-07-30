import {action} from './util';

export const ACTIONS = {
  LOAD_STATE: 'LOAD_STATE',
};

export const stateLoad = state => action(ACTIONS.LOAD_STATE, {state});
