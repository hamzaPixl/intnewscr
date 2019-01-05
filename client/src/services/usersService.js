import { request, handleResponse } from '../helpers/request';
import authHeader from '../helpers/auth-header';

function getAllUsers(queryParams) {
  return request(`admin/users${queryParams}`, 'GET', null, authHeader())
    .then(handleResponse);
}

function deleteUser(id) {
  return request(`admin/users/${id}`, 'DELETE', null, authHeader())
    .then(handleResponse);
}

function addUser(user) {
  let headers = authHeader();
  headers = {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return request('admin/users', 'POST', JSON.stringify(user), headers)
    .then(handleResponse);
}

export {
  getAllUsers,
  deleteUser,
  addUser,
};
