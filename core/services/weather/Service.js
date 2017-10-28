const repositories = require('../../repositories');

function get() {
  return repositories.weatherRepository.weatherRepository.get();
}

module.exports = {
  get,
};
