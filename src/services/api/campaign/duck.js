import { makeApiServiceActionTypes } from '../../util';

export const actionTypes = {
  ...makeApiServiceActionTypes('GET_CAMPAIGN', 'campaign/GET'),
  ...makeApiServiceActionTypes('POST_CAMPAIGN', 'campaing/POST'),
};

const initialState = {
  id: null,
  name: null,
  timestamp: null,
};

export const campainMetadataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CAMPAIGN:
      return state;
    case actionTypes.POST_CAMPAIGN:
      return state;
    default:
      return state;
  }
};

export const actions = {

};
