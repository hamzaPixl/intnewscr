function Buisness (services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
  this.locator = new this.ModuleLocator();
  this.widgetsController = new this.ControllerWidget();
  this.db = this.low('./database/DefaultParameter.json', {storage: require('lowdb/lib/storages/file-async')});
}

Buisness.prototype = {

  /**
   * Get All widgets
   * @return {*|Promise|Object}
   */
  getAllWidgets: function getAllWidgets () {
    return this.widgetsController.getAll();
  },

  /**
   * It gives the default parameter for all routes
   * @private
   * @return Array
   */
  getDefaultParameter: function getDefaultParameter () {
    return this.db.get('parameters').value();
  },

  /**
   * Get all modules that are
   * available in the app, test them to give their status and their default parameter
   * @see ModuleLocator
   * @return Promise
   */
  getAll: function getAll () {
    const modules = this.locator.modules;
    return new Promise((resolve, reject) => {
      if (!modules) {
        reject('Nothing found');
      } else {
        resolve({modules, default: this.getDefaultParameter()});
      }
    });
  },

  /**
   * Set default parameter with value in @param
   * @param params
   * @return {*|Array}
   */
  setDefault: function setDefault (params) {
    this.db.get('parameters')
      .find({route: params.route})
      .assign({params: params.params})
      .write();
    return new Promise((resolve, reject) => {
      resolve(this.getDefaultParameter());
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
