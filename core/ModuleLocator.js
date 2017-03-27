const path = require('path');

function ModuleLocator (modulesRoutePath, dirmoduleRoutePath) {
  this.modulesRoutePath = modulesRoutePath || './configs/modules.json';
  this.modules = require(this.modulesRoutePath);
  this.dirmoduleRoutePath = dirmoduleRoutePath || `${path.resolve(__dirname, './../modules/')}/`;
}

ModuleLocator.prototype = {

  /**
   * returns the Controller
   * of the module
   * @see ModuleLocator::moduleExists()
   * @return null if it doesnt exists
   * @return {{*}} module Controller
   */
  getModuleController: function getModuleController (moduleName) {
    if (!this.moduleExists(moduleName)) {
      return null;
    }
    return require(`${this.getAbsolutePath(moduleName)}${moduleName}/Controller`);
  },

  /**
   * returns the Model
   * of the module
   * @see ModuleLocator::moduleExists()
   * @return null if it doesnt exists
   * @return {{*}} module Model
   */
  getModuleModel: function getModuleModel (moduleName, modelName) {
    if (!this.moduleExists(moduleName)) {
      return null;
    }
    return require(`${this.getAbsolutePath(moduleName)}${moduleName}/models/${modelName}`);
  },

  /**
   * returns the Main
   * of the module
   * @see ModuleLocator::moduleExists()
   * @return null if it doesnt exists
   * @return {{*}} module Main
   */
  getModuleMain: function getModuleMain (moduleName) {
    if (!this.moduleExists(moduleName)) {
      return null;
    }
    return require(`${this.getAbsolutePath(moduleName)}${moduleName}/Main`);
  },

  /**
   * returns the object correspond
   * to the name of the module
   * test if the name is a string and
   * it is in the modules files
   * @return null if it doesnt exists
   * @return {{*}} module value
   */
  getModule: function getModule (moduleName) {
    if (!this.moduleExists(moduleName)) {
      return null;
    }
    return this.modules[moduleName];
  },

  /**
   * returns true if the module exists
   * test if the name is a string and
   * it is in the modules files
   * @private
   * @return false if it doesn't exists
   * @return true if it exists
   */
  moduleExists: function moduleExists (moduleName) {
    if (typeof moduleName !== 'string') {
      return false;
    }
    if (this.modules[moduleName] === undefined) {
      return false;
    }
    return true;
  },

  /**
   * returns the path to reteive the module
   * @return default if no path on module
   * @return path on config file
   */
  getAbsolutePath: function getAbsolutePath (moduleName) {
    if (this.getModule(moduleName).path) {
      return `${path.resolve(__dirname, this.getModule(moduleName).path)}/`;
    }
    return this.dirmoduleRoutePath;
  },

};

module.exports = ModuleLocator;
