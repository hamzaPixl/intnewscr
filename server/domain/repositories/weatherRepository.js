const config = require('config');
const Weather = require('../models/Weather');

/**
 * Save a new weather in the database
 * @param {Weather} weather
 * @returns {Weather} the weather saved
 */
function save(weather) {
  return weather.save()
    .then(() => weather);
}

/**
 * Retrieve all weather by city
 * @returns {Array[Weather]}
 */
function findAllByCity(city) {
  return Weather.find({ 'location': city });
}

module.exports = {
  save,
  findAllByCity,
};
