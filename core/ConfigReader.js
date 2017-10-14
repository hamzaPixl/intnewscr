class ConfigReader {

  constructor(moduleName, moduleLocator) {
    this.moduleName = moduleName;
    this.moduleLocator = moduleLocator;
  }

  /**
   * returns the modulename
   * @return null if module doesn't exists
   * @return {{*}} if it exists
   */
  getModuleName() {
    return this.moduleName;
  }

  /**
   * returns the moduleLocator
   * @return null if module doesn't exists
   * @return {{*}} if it exists
   */
  getModuleLocator() {
    return this.moduleLocator;
  }

  /**
   * returns the modules configuration value
   * test if the module module exists:
   * we test that by using the moduleLocator.
   * @see ModuleLocator::moduleExists()
   * @private
   * @return null if module doesn't exists
   * @return {{*}} if module exists
   */
  getModuleConfigurationPath() {
    if (!this.moduleLocator.moduleExists(this.moduleName)) {
      return null;
    }
    return this.moduleLocator.getModule(this.moduleName);
  }

  /**
   * returns the configuration value
   * @see ModuleLocator::configIsValid()
   * @private
   * @return null if definition and value doesn't match
   * @return {{*}} if configuration is valid
   */
  getConfigValue() {
    const moduleConfig = this.getModuleConfigurationPath();
    if (!moduleConfig) {
      return null;
    }
    return require(`${moduleConfig.path}${moduleConfig.value}`);
  }

  /**
   * returns the configuration check
   * @see ModuleLocator::configIsValid()
   * @private
   * @return null if definition and value doesn't match
   * @return {{*}} if configuration is valid
   */
  getConfigCheck() {
    const moduleConfig = this.getModuleConfigurationPath();
    if (!moduleConfig) {
      return null;
    }
    const { config } = require(`${moduleConfig.path}${moduleConfig.check}`);
    return config;
  }

  /**
   * returns the modules services
   * @see ConfigReader::getModuleConfiguration()
   * @return null if module doesn't exists
   * @return {{*}} if module exists
   */
  getServices() {
    const moduleConfig = this.getModuleConfigurationPath();
    if (!moduleConfig) {
      return null;
    }
    const { services } = require(`${moduleConfig.path}${moduleConfig.check}`);
    return services;
  }

}

module.exports = ConfigReader;
