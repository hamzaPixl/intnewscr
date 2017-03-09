const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const WeatherItem = require('./models/WeatherItem');


function Controller(moduleLocator, config, services) {
    this.config = config;
    this.services = services;
    this.moduleLocator = moduleLocator;
    this.buisness = new Buisness(this.services, this.config);
    this.repository = new Repository(WeatherItem);
}

Controller.prototype = {

    getWeather: function getWeather() {

        var weather = this.repository.findAll();
        if (weather && weather.length > 0) {
            return new Promise(function(resolve, reject) {
                resolve(weather);
            });
        }

        return new Promise(function(resolve, reject) {
            this.buisness.getWeather().then(function(weather) {
                this.repository.saveAll(weather);
                resolve(this.repository.findAll());
            }.bind(this));
        }.bind(this));


    }

};

module.exports = Controller;