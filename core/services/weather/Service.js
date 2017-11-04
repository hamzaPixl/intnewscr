const repositories = require('../../repositories');

function get(db) {
  return repositories.weatherRepository.weatherRepository.get(db);
}

module.exports = {
  get,
};
