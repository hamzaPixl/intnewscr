function Buisness(services, config) {
    this.services = services;
    this.config = config;
    for (var key in this.services) {
        this[key] = require(this.services[key].name);
    }
}

Buisness.prototype = {

    /**
     * This function scrapp the HTML code to exports data
     * 
     * 
     * @param url is the link to retreive data
     * @param indice is the indice of childeren for the result
     * @param line is the STIB line
     * @param destination is the destination of the line
     * 
     * @private 
     * 
     * @return  the promis that contains data
     */

    scrapping: function scrapping(url, indice, line, destination) {
        return new Promise(function(resolve, reject) {
            this.request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let $ = this.cheerio.load(body);
                    let ul = $('#realtime_view').children();
                    resolve([{
                        "destination": destination,
                        "indice": line,
                        "line": ul[ul.length - indice].children[0].children[1].children[0].data
                    }, {
                        "destination": destination,
                        "indice": line,
                        "line": ul[ul.length - indice].children[1].children[1].children[0].data
                    }]);
                } else {
                    reject(error);
                }
            }.bind(this));
        }.bind(this));
    },

    /**
     * This function give the information about
     * the time of the differents STIB line around EMAKINA 
     * @line is the STIB's Line
     * @return a Promise that contains data
     */
    getLine: function getLine(line) {
        var result = [];
        if (line == 17) {
            return new Promise(function(resolve, reject) {
                this.scrapping(this.config.stib_17_heli, 1, line, 'HEILIGENBORRE').then(function(result_heli) {
                    this.scrapping(this.config.stib_17_beaulieu, 3, line, 'BEAULIEU').then(function(result_beaulieu) {
                        result = result_beaulieu.concat(result_heli);
                        resolve(result);
                    }, function(err) {
                        reject(err);
                    });
                }.bind(this), function(err) {
                    reject(err);
                });
            }.bind(this));
        }

        if (line == 94) {
            return new Promise(function(resolve, reject) {
                this.scrapping(this.config.stib_94_louise, 1, line, 'LOUISE').then(function(result_louise) {
                    this.scrapping(this.config.stib_94_mt, 1, line, 'MUSEE DU TRAM').then(function(result_mt) {
                        result = result_louise.concat(result_mt);
                        resolve(result);
                    }, function(err) {
                        reject(err);
                    });
                }.bind(this), function(err) {
                    reject(err);
                });
            }.bind(this));
        }

        if (line == 95) {
            return this.scrapping(this.config.stib_95_gp, 1, line, 'GRANDE PLACE');
        }
    }


};

module.exports = Buisness;