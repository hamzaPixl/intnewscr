function Buisness(services, config) {
    this.services = services;
    this.config = config;
    for (var key in this.services) {
        this[key] = require(this.services[key].name);
    }
}

Buisness.prototype = {

    /**
     * It search the weather forecast for Brussels on Belgium
     * and degrees are un C 
     * @return Promise with data
     */
    getWeather: function getWeather() {
        return new Promise(function(resolve, reject) {
            this.weatherJs.find({ search: 'Brussels, Belgium', degreeType: 'C' }, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].forecast);
                }
            });
        }.bind(this));
    },

};

module.exports = Buisness;