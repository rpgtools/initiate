import jwtdecode from 'jwt-decode';

const userReducer = (state = {}, action) => {
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
