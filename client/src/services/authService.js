import { request } from '../helpers/request';
import authHeader from '../helpers/auth-header';

function handleResponse(response) {
  return response.json()
    .then((res) => {
      if (res.status && res.status !== 200) {
        const error = `${res.name} : ${res.message}`;
        return Promise.reject(error);
      }
      return res;
    });
}

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
