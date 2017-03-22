function Buisness (services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
  this.locator = new this.ModuleLocator();
}

Buisness.prototype = {

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
        resolve(mainModule.routes);
      }
    });
  },
};

module.exports = Buisness;
