const Buisness = require('./Buisness');

function Controller(config, services) {
    this.config = config;
    this.services = services;
    this.buisness = new Buisness(this.services, this.config);
}

Controller.prototype = {
    /**
     * Get the 2 last information about the stib's line
     * 
     * @see Buisness:getLine();
     */
    getLine: function getLine(params) {
        return this.buisness.getLine(params.line);
    }
};

module.exports = Controller;