const repositories = require('../../repositories');
const logger = require('../../../tools/logger.js');
const { validateResult } = require('../../../tools/utils');

function get(params, db) {
  return new Promise((resolve, reject) => {
    const resultRepository = repositories.weatherRepository.weatherRepository.get(db);
    resultRepository.then((results) => {
      if (validateResult(results)) {
        resolve(results);
      } else {
        repositories.weatherRepository.weatherRepository
        .fetchWeather(params.city)
        .then( results => {
          console.log('insert')
          repositories.weatherRepository.weatherRepository.insertManyFromApi(results, db);
          resolve(results);
        });
      }
    }).catch(err => logger.log(err));
  });
}

module.exports = {
  get,
};
