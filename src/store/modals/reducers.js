import { MODAL_OPEN, MODAL_CLOSE } from './types';
import { createReducer } from '../../utils/reducerUtils';

const initialState = [];

export function openModal(state, payload) {
  const {modalType, modalProps} = payload;
  return state.concat( { modalType, modalProps });
};

export function closeModal(state, payload) {
  const newState = state.slice();
  newState.pop();
  return newState;
};

export default createReducer(initialState,  {
    [MODAL_OPEN] : openModal,
    [MODAL_CLOSE] : closeModal
});
