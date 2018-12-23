import { LOGIN_FAILURE, LOGOUT, LOGIN_SUCCESS, LOGIN_REQUEST } from '../constants';
import { authService } from '../services';
import { alertActions } from './';
import history from '../helpers/history';


function request(user) { return { type: LOGIN_REQUEST, user }; }
function success(user) { return { type: LOGIN_SUCCESS, user }; }
function failure(error) { return { type: LOGIN_FAILURE, error }; }

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    authService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function logout() {
  authService.logout();
  return { type: LOGOUT };
}

export {
  login,
  logout,
};
