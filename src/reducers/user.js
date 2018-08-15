import jwtdecode from 'jwt-decode';

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_USER': {
      const user = jwtdecode(document.cookie).user;
      return user;
    }
    default:
      return state;
  }
}

export { userReducer };
