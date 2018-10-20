const config = require('config');
const { get } = require('lodash');

const newsServices = get(config, 'services.news.stub', false) ? require('./__mocks__/newsService') : require('./newsService');

module.exports = {
  newsServices,
};
