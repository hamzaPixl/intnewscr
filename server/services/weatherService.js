const { weatherRepository } = require('../domain/repositories');
const { weatherFactory } = require('../domain/factories');
const weatherService = require('../infrastructure/weatherService');

async function get(city) {
  const weathers = await weatherRepository.findAllByCity(city);
  if (weathers && weathers.length) {
    return weathers;
  }
  let weathersApi = await weatherService.fetchWeather(city);
  weathersApi = weathersApi.map(weatherFactory.createFromPayload);

  return Promise.all(weathersApi.map(w => w.save()))
    .then(() => weatherRepository.findAllByCity(city));
}

module.exports = {
  get,
};
