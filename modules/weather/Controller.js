const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const WeatherItem = require('./models/WeatherItem');


function Controller(config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repository = new Repository(WeatherItem);
}

Controller.prototype = {

    /**
     * Call the buisness if there are no data in database
     * else it return the data that the databse contains
     * @return Promis that contains data
     */
  getWeather: function getWeather() {
    const weather = this.repository.findAll();
    if (weather && weather.length > 0) {
      return new Promise((resolve, reject) => {
        if (!weather) {
          reject(weather);
        }
        resolve(weather);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getWeather().then((weatherBuis) => {
        if (!weatherBuis) {
          reject(weatherBuis);
        }
        this.repository.saveAll(weatherBuis);
        resolve(this.repository.findAll());
      });
    });
  },
};

module.exports = Controller;