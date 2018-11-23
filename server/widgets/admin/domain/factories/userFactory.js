const Users = require('../models/Users');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new Users({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
    role: payload.role,
  });
}

module.exports = {
  createFromPayload,
};
