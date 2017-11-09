const weather = require('yahoo-weather');
const RepositoryController = require('../../../database/RepositoryController');
const Model = require('../../../database/models/weather');
const logger = require('../../../tools/logger.js');

const model = new Model();

/**
 * Get All weather from the db collection
 * @param {string} [city='Brussels'] the weather is from this location
 * @param {any} db instance
 * @returns {Promise}
 */
function get(city = 'Brussels', db) {
  const controller = new RepositoryController(db, model);
  return controller.findByValues({ 'location.city': city });
}

/**
 * Insert all weather fetch from api
 * @param {Array} forecats the array that will be insert
 * @param {any} db instance
 * @returns {Promise}
 */
function insertManyFromApi(forecats, db) {
  const controller = new RepositoryController(db, model);
  return controller.insertMany(forecats);
}

/**
 * Fetch the weather from the api
 * @param {any} city the weather is from this location
 * @param {string} [unit='c'] unit use for temperature
 * @returns {Promise}
 */
function fetchWeather(city, unit = 'c') {
  return new Promise((resolve, reject) => {
    weather(city, unit)
    .then((info) => {
      if (!info) {
        return reject({ message: 'No data from the api please try later' });
      }
      const forecast = info.item.forecast.map((element) => {
        const item = element;
        item.location = info.location;
        item.units = info.units;
        return item;
      });
      forecast[0].astronomy = info.astronomy;
      forecast[0].wind = info.wind;
      return resolve(forecast);
    })
    .catch((err) => {
      logger.log(err);
      return reject(err);
    });
  });
}

module.exports = {
  get,
  insertManyFromApi,
  fetchWeather,
};
