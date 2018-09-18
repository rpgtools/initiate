import * as actionTypes from './types';

export const openModal = (modalType, modalProps) => ({
  type: actionTypes.MODAL_OPEN,
  payload: {
    modalType,
    modalProps,
  }
});

export const closeModal = () => ({
  type: actionTypes.MODAL_CLOSE
});
