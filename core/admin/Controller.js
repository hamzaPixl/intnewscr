const Buisness = require('./Buisness');
const jwt = require('jsonwebtoken');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
}

Controller.prototype = {

  /**
   * Set the token for the admin user
   * after check his username and password
   * @param params
   */
  connexion: function connexion (params, client) {
    if (params.username !== process.env.USER || params.password !== process.env.PASSWORD) {
      return null;
    }
    // Expire in 1 hour
    const exp = Math.floor(Date.now() / 1000) + (60 * 60);
    const token = jwt.sign({
      exp,
      data: {
        id: client.conn.id,
        username: params.username,
        password: params.password,
        exp,
        created: Date.now(),
      },
    }, process.env.JWT_SECRET);
    return new Promise((resolve, reject) => {
      resolve(token);
    });
  },
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
