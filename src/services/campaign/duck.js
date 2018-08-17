export const actionTypes = {
  GET_CAMPAIGN = 'campaign/GET',
  POST_CAMPAIGN = 'campaing/POST',
};

export const campainsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_CAMPAIGN:
      return state;
    case actionTypes.POST_CAMPAIGN:
      return state;
    default:
      return state;
  }
}

export const actions = {

};
