const logger = require('../../../../infrastructure/logger');
const weathers = require('./weather.json');

async function get() {
  logger.info('STUB - Weather widget');
  return Promise.resolve(weathers);
}

module.exports = {
  get,
};
