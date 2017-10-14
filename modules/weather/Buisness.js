class Buisness {
  constructor(services, config) {
    this.services = services;
    this.config = config;
    Object.keys(this.services).map((serviceKey) => {
      this[serviceKey] = require(this.services[serviceKey].name);
      return this;
    });
  }

  /**
   * It search the weather forecast for Brussels on Belgium
   * and degrees are un C
   * @return Promise with data
   */
  getWeather() {
    return new Promise((resolve, reject) => {
      this.weatherJs(this.config.city, this.config.options).then((info) => {
        if (!info) {
          reject(info);
        } else {
          resolve(info.item.forecast);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

module.exports = Buisness;
