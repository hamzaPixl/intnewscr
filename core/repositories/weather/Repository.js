const Promise = require('bluebird');

/**
 * Get all the weather
 * @param {any} queryParams
 */
function get(queryParams) {
  return new Promise(resolve => resolve([{ weather: 'first' }, { weather: 'second' }]));
}

module.exports = {
  get,
};
