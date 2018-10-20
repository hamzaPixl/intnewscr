const config = require('config');
const { get } = require('lodash');

const weatherServices = get(config, 'services.weather.stub', false) ? require('./__mocks__/weatherService') : require('./weatherService');

module.exports = {
  weatherServices,
};
