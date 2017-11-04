const repositories = require('../../repositories');

function get(queryParams) {
  return repositories.weatherRepository.weatherRepository.get(queryParams);
}

module.exports = {
  get,
};
