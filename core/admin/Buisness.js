class Buisness {

  constructor(services, config) {
    this.services = services;
    this.config = config;
    Object.keys(this.services).map((serviceKey) => {
      this[serviceKey] = require(this.services[serviceKey].name);
      return this;
    });
    this.locator = new this.ModuleLocator();
    this.widgetsController = new this.ControllerWidget();
    this.viewController = new this.ViewController();
    this.db = this.low('./database/DefaultParameter.json', { storage: require('lowdb/lib/storages/file-async') });
  }

  /**
   * Get All views
   * @return {Promise}
   */
  getAllView() {
    return this.viewController.getAll();
  }

  /**
   * Delete a views
   * @param params
   * @return {Promise}
   */
  deleteView(params) {
    return this.viewController.deleteView(params);
  }

  /**
   * Create views
   * @param params
   * @return {Promise}
   */
  createView(params) {
    return this.viewController.createView(params);
  }

  /**
   * Update a views
   * @param params
   * @return {Promise}
   */
  updateView(params) {
    return this.viewController.updateView(params);
  }

  /**
   * Get All widgets
   * @return {*|Promise|Object}
   */
  getAllWidgets() {
    return this.widgetsController.getAll();
  }

  /**
   * Delete a widgets
   * @param params
   * @return {*}
   */
  deleteWidget(params) {
    return this.widgetsController.deleteWidget(params);
  }

  /**
   * Create widgets
   * @param params
   * @return {*}
   */
  createWidget(params) {
    return this.widgetsController.createWidget(params);
  }

  /**
   * update a widgets
   * @param params
   * @return {*}
   */
  updateWidget(params) {
    return this.widgetsController.updateWidget(params);
  }

  /**
   * It gives the default parameter for all routes
   * @private
   * @return Array
   */
  getDefaultParameter() {
    return this.db.get('parameters').value();
  }

  /**
   * Get all modules that are
   * available in the app, test them to give their status and their default parameter
   * @see ModuleLocator
   * @return Promise
   */
  getAll() {
    const modules = this.locator.modules;
    const allRoutes = new Promise((resolve, reject) => {
      const routes = {};
      Object.keys(modules).forEach((item) => {
        this.getRoutes(item).then((data) => {
          routes[item] = data;
          if (Object.keys(routes).length === Object.keys(modules).length) {
            resolve(routes);
          }
        }).catch(() => {});
      });
    });
    return new Promise((resolve, reject) => {
      if (!modules) {
        reject('Nothing found');
      } else {
        allRoutes.then((routes) => {
          resolve({ routes, modules, default: this.getDefaultParameter() });
        }).catch((err) => {
        });
      }
    });
  }

  /**
   * Set default parameter with value in @param
   * @param params
   * @return {*|Array}
   */
  setDefault(params) {
    this.db.get('parameters')
      .find({ route: params.route })
      .assign({ params: params.params })
      .write();
    return new Promise((resolve, reject) => {
      resolve(this.getDefaultParameter());
    });
  }

  /**
   * Get all modules routes that are
   * available in the app
   * @see ModuleLocator
   * @return Promise
   */
  getRoutes(module) {
    const Main = this.locator.getModuleMain(module);
    return new Promise((resolve, reject) => {
      if (!Main) {
        reject('Nothing found');
      } else {
        const mainModule = new Main();
        resolve({ data: mainModule.routes, module });
      }
    });
  }

  /**
   * Retrieve all token that the app use
   * @return {Promise}
   */
  getToken() {
    return new Promise((resolve, reject) => {
      let result = [];
      Object.keys(this.tokens).forEach((index) => {
        result = result.concat(JSON.parse(this.fs.readFileSync(this.tokens[index].path)));
      });
      resolve(result);
    });
  }

  /**
   * get all services that use aut0
   * @return {Promise}
   */
  getAuthServices() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(this.fs.readFileSync(this.config.authServices)));
    });
  }

}

module.exports = Buisness;
