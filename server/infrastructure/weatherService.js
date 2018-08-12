const weather = require('yahoo-weather');

function fetchWeather(city, unit = 'c') {
  return weather(city, unit)
  .then((info) => {
    const forecast = info.item.forecast.map((element) => {
      const item = element;
      item.location = info.location;
      item.units = info.units;
      return item;
    });
    forecast[0].astronomy = info.astronomy;
    forecast[0].wind = info.wind;
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
