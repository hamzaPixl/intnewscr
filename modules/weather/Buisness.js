function Buisness(services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {

    /**
     * It search the weather forecast for Brussels on Belgium
     * and degrees are un C
     * @return Promise with data
     */
  getWeather: function getWeather() {
    return new Promise((resolve, reject) => {
      this.weatherJs.find({ search: 'Brussels, Belgium', degreeType: 'C' }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].forecast);
        }
      });
    });
  },
};

module.exports = Buisness;
