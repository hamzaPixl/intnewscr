const Buisness = require('./Buisness');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
}

Controller.prototype = {

  /**
   * Test a route and get status response
   * @return Promise
   */
  testRoute: function testRoute (params) {
    return this.buisness.testRoute(params);
  },
  /**
   * Get all modules that are
   * available in the app
   * @return Promise
   */
  getAll: function getAll () {
    return this.buisness.getAll();
  },
  /**
   * Get all modules routes that are
   * available in the app
   * @return Promise
   */
  getRoutes: function getRoutes (params) {
    return this.buisness.getRoutes(params.module);
  },

};

module.exports = Controller;
