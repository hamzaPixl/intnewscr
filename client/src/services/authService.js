import { request, handleResponse } from '../helpers/request';
import authHeader from '../helpers/auth-header';
import history from '../helpers/history';

function getProfil() {
  return request('admin/users/me', 'GET', null, authHeader())
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  history.push('/');
}

function login(email, password) {
  const body = `email=${email}&password=${password}`;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  return request('admin/auth', 'POST', body, headers)
    .then(handleResponse)
    .then(({ token }) => {
      localStorage.setItem('token', token);
      return token;
    })
    .then(() => getProfil());
}

export {
  login,
  logout,
  getProfil,
};
