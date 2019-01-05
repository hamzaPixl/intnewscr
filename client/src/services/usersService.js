import { request, handleResponse } from '../helpers/request';
import authHeader from '../helpers/auth-header';

function getAllUsers(queryParams) {
  return request(`admin/users${queryParams}`, 'GET', null, authHeader())
    .then(handleResponse);
}

export {
  getAllUsers,
};
