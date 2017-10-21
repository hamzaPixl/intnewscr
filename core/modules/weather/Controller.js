const Buisness = require('./Buisness');
const Repository = require('./../..//Repository');
const WeatherItem = require('./models/WeatherItem');

class Controller {
  constructor(config, services) {
    this.config = config;
    this.services = services;
    this.buisness = new Buisness(this.services, this.config);
    this.repository = new Repository(WeatherItem);
  }

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * @return Promis that contains data
   */
  getWeather() {
    const weather = this.repository.findAll();
    if (this.repository.resultIsValid(weather)) {
      return new Promise((resolve, reject) => {
        if (!weather) {
          reject(weather);
        }
        // return only today and 4 next days
        resolve(weather.slice(0, 5));
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getWeather().then((weatherBuis) => {
        if (!weatherBuis) {
          reject(weatherBuis);
        }
        this.repository.saveAll(weatherBuis);
        // return only today and 4 next days
        resolve(this.repository.findAll().slice(0, 5));
      });
    });
  }

}

module.exports = Controller;