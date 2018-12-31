import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../constants/authConstants';
import { login, logout } from '../services/authService';
import history from '../helpers/history';

function request(user) { return { type: LOGIN_REQUEST, user }; }
function success(user) { return { type: LOGIN_SUCCESS, user }; }
function failure(error) { return { type: LOGIN_FAILURE, error }; }

export function loginUser(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

export function logoutUser() {
  logout();
  return { type: LOGOUT };
}
