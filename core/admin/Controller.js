const Buisness = require('./Buisness');


function Controller(config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
}

Controller.prototype = {

  /**
  * Get all modules that are
  * available in the app
  * @return Promise
  */
  getAll: function getAll() {
    return this.buisness.getAll();
  },

  /**
  * Get all modules routes that are
  * available in the app
  * @return Promise
  */
  getRoutes: function getRoutes(params) {
    return this.buisness.getRoutes(params.module);
  },

};

module.exports = Controller;
