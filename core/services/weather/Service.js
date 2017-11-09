const { weatherRepository } = require('../../repositories');
const logger = require('../../../tools/logger.js');
const { validateResult } = require('../../../tools/utils');

function get(params, db) {
  return new Promise((resolve, reject) => {
    weatherRepository.get(db)
    .then((results) => {
      if (validateResult(results)) {
        resolve(results);
      } else {
        weatherRepository
        .fetchWeather(params.city)
        .then((weathers) => {
          weatherRepository.insertManyFromApi(weathers, db)
          .then((weathersResult) => {
            resolve(weathersResult);
          });
        });
      }
    })
    .catch((err) => {
      logger.log(err);
      reject(err);
    });
  });
}

module.exports = {
  get,
};
