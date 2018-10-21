const weathers = require('./weather.json');

async function get() {
  // STUB - Weather widget
  return Promise.resolve(weathers);
}

module.exports = {
  get,
};
