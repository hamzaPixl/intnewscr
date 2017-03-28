function Buisness (services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
  this.locator = new this.ModuleLocator();
  this.db = this.low('./core/admin/DefaultParameter.json', {storage: require('lowdb/lib/storages/file-async')});
}

Buisness.prototype = {

  /**
   *
   * @returns {Promise}
   */
  testAll: function testAll () {
    const result = this.db.get('parameters').map().value();
    /* return new Promise((resolve, reject) => {
     const result = [];
     this.db.get({}, (err, docs) => {
     if (err || !docs) {
     return;
     }
     Object.keys(docs).map((route) => {
     const request = new this.RequestModel(`${route}`, `${docs[route].module}${route}`, docs[route].params);
     const controller = new this.Controller();
     controller.request(request).then((data) => {
     if (!data) {
     result[route] = false;
     } else {
     result[route] = true;
     }
     }).catch((err) => {result[route] = true;});
     return this;
     });
     resolve(result);
     });
     });*/
  },

  /**
   * Get all modules that are
   * available in the app
   * @see ModuleLocator
   * @return Promise
   */
  getAll: function getAll () {
    const modules = this.locator.modules;
    return new Promise((resolve, reject) => {
      if (!modules) {
        reject('Nothing found');
      } else {
        resolve(modules);
      }
    });
  },
  /**
   * It test a route by calling the module
   * @param params contains param to call the module service
   * @returns {Promise}
   */
  testRoute: function testRoute (params) {
    return new Promise((resolve, reject) => {
      const request = new this.RequestModel(`${params.url}`, `${params.route}`, params.params);
      const controller = new this.Controller();
      controller.request(request).then((data) => {
        resolve(data);
      });
    });
  },
  /**
   * Get all modules routes that are
   * available in the app
   * @see ModuleLocator
   * @return Promise
   */
  getRoutes: function getRoutes (module) {
    const Main = this.locator.getModuleMain(module);
    return new Promise((resolve, reject) => {
      if (!Main) {
        reject('Nothing found');
      } else {
        const mainModule = new Main();
        resolve({data: mainModule.routes, module});
      }
    });
  },
};

module.exports = Buisness;
