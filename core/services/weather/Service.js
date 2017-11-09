const { weatherRepository } = require('../../repositories');
const logger = require('../../../tools/logger.js');
const { validateResult } = require('../../../tools/utils');

function get(params, db) {
  return new Promise((resolve, reject) => {
    const resultRepository = weatherRepository.get(db);
    resultRepository.then((results) => {
      if (validateResult(results)) {
        resolve(results);
      } else {
        weatherRepository
        .fetchWeather(params.city)
        .then((weathers) => {
          weatherRepository.insertManyFromApi(weathers, db);
          resolve(weathers);
        });
      }
    }).catch(err => logger.log(err));
  });
}

module.exports = {
  get,
};
