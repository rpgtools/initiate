import jwtdecode from 'jwt-decode';

const initialState = {
  token: '',
  name: '',
  email: '',
  campaigns: [],
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_USER': {
      let user = jwtdecode(document.cookie).user;
      return { ...user, token: document.cookie };
    }
    default:
      return state;
  }
}

export { userReducer };
