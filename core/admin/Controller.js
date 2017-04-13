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
   * @param client
   * @returns {*}
   */
  connexion: function connexion (params, client) {
    if (params.username !== process.env.USER || params.password !== process.env.PASSWORD) {
      return null;
    }
    // Expire in 6 hour
    const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 6);
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
   * get all services that use aut0
   * @return {Promise}
   */
  getAuthServices: function getAuthServices () {
    return this.buisness.getAuthServices();
  },

  /**
   * Get all modules that are
   * available in the app
   * @returns {*|Promise}
   */
  getAll: function getAll () {
    return this.buisness.getAll();
  },

  /**
   * Get all modules routes that are
   * available in the app
   * @param params
   * @returns {*|Promise}
   */
  getRoutes: function getRoutes (params) {
    return this.buisness.getRoutes(params.module);
  },

  /**
   * Set the default parameter of a route
   * @param params
   * @returns {*|Promise}
   */
  setDefault: function setDefault (params) {
    return this.buisness.setDefault(params);
  },

  /**
   * Get all token that are used
   * in app to call api
   * @returns {*|Promise}
   */
  getToken: function getToken () {
    return this.buisness.getToken();
  },

  /**
   * Get All widgets
   * @return {*}
   */
  getAllWidgets: function getAllWidgets() {
    return this.buisness.getAllWidgets();
  },
  /**
   * Delete a widgets
   * @param params
   * @return {*}
   */
  deleteWidget: function deleteWidget(params) {
    return this.buisness.deleteWidget(params);
  },
  /**
   * Create widgets
   * @param params
   * @return {*}
   */
  createWidget: function createWidget(params) {
    return this.buisness.createWidget(params);
  },
  /**
   * Ypdate a widgets
   * @param params
   * @return {*}
   */
  updateWidget: function updateWidget(params) {
    return this.buisness.updateWidget(params);
  },

  /**
   * Get All views
   * @return {*}
   */
  getAllView: function getAllView() {
    return this.buisness.getAllView();
  },
  /**
   * Delete a views
   * @param params
   * @return {*}
   */
  deleteView: function deleteView(params) {
    return this.buisness.deleteView(params);
  },
  /**
   * Create views
   * @param params
   * @return {*}
   */
  createView: function createView(params) {
    return this.buisness.createView(params);
  },
  /**
   * Ypdate a views
   * @param params
   * @return {*}
   */
  updateView: function updateView(params) {
    return this.buisness.updateView(params);
  },
};

module.exports = Controller;
