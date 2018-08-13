const config = require('config');
const logger = require('./logger');
const weather = require('yahoo-weather');

function fetchWeather(city, unit = config.get('services.weather.extra.unit')) {
  return weather(city, unit)
    .then((info) => {
      const forecast = info.item.forecast.map((element) => {
        const item = element;
        item.location = city;
        item.units = info.units.temperature;
        return item;
      });
      return forecast;
    })
    .catch((err) => {
      logger.log(err);
      throw err;
    });
}


module.exports = {
  fetchWeather,
};
