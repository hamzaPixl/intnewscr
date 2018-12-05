const config = require('config');
const { get } = require('lodash');

const authServices = get(config, 'services.admin.stub', false) ? require('./__mocks__/authServices') : require('./authServices');
const usersServices = get(config, 'services.admin.stub', false) ? require('./__mocks__/usersServices') : require('./usersServices');
const configurationsServices = get(config, 'services.admin.stub', false) ? require('./__mocks__/configurationsServices') : require('./configurationsServices');

module.exports = {
  authServices,
  usersServices,
  configurationsServices,
};
