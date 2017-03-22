function ConfigReader(moduleName, moduleLocator, configRoutePath, valueRoutePath) {
  this.moduleName = moduleName;
  this.moduleLocator = moduleLocator;
  this.configRoutePath = configRoutePath;
  this.valueRoutePath = valueRoutePath || './components/';
}

ConfigReader.prototype = {

  /**
  * returns the configuration value
  * @see ModuleLocator::configIsValid()
  * @private
  * @return null if definition and value doesn't match
  * @return {{*}} if configuration is valid
  */
  getConfig: function getConfig() {
    if (!this.configIsValid()) {
      return null;
    }
    return this.getModuleConfigurationValue();
  },

  /**
  * returns the true if de definition match to value
  * @see ModuleLocator::getModuleConfigurationDefinition()
  * @see ModuleLocator::getModuleConfigurationValue()
  * @private
  * @return true if definition and value doesn't match
  * @return false if it is valid
  */
  configIsValid: function configIsValid() {
    const configCheck = this.getModuleConfigurationDefinition();
    const configValue = this.getModuleConfigurationValue();
    let missingConfigurations = [];
    if (!configValue && !configCheck) {
      return false;
    }
    // We filter out all parameters that are either not require or available
    // This way, if all is ok after this filter, configCheck.config should be empty
    missingConfigurations = Object.keys(configCheck.config)
      .filter((parameterDefinitionKey) => {
        const parameterDefinition = configCheck.config[parameterDefinitionKey];
        if (!parameterDefinition.require) {
          return false;
        }
        if (configValue[parameterDefinition.name] === undefined) {
          return true;
        }
        return typeof configValue[parameterDefinition.name] !== parameterDefinition.type;
      });
    return missingConfigurations.length === 0;
  },

  /**
  * returns the modules services
  * @see ConfigReader::getModuleConfigurationDefinition()
  * @return null if module doesn't exists
  * @return {{*}} if module exists
  */
  getServices: function getServices() {
    const config = this.getModuleConfigurationDefinition();
    if (!config) {
      return null;
    }
    return config.services;
  },

  /**
  * returns the modulename
  * @return null if module doesn't exists
  * @return {{*}} if it exists
  */
  getModuleName: function getModuleName() {
    return this.moduleName;
  },

  /**
  * returns the moduleLocator
  * @return null if module doesn't exists
  * @return {{*}} if it exists
  */
  getModuleLocator: function getModuleLocator() {
    return this.moduleLocator;
  },

  /**
  * returns the modules configuration value
  * test if the module module exists:
  * we test that by using the moduleLocator.
  * @see ModuleLocator::moduleExists()
  * @private
  * @return null if module doesn't exists
  * @return {{*}} if module exists
  */
  getModuleConfigurationValue: function getModuleConfigurationValue() {
    if (!this.moduleLocator.moduleExists(this.moduleName)) {
      return null;
    }
    return require(`${this.valueRoutePath}${this.moduleLocator.getModule(this.moduleName).value}`);
  },

  /**
  * returns the modules configuration definition
  * test if the module module exists:
  * we test that by using the moduleLocator.
  * @see ModuleLocator::moduleExists()
  * @private
  * @return null if module doesn't exists
  * @return {{*}} if module exists
  */
  getModuleConfigurationDefinition: function getModuleConfigurationDefinition() {
    if (!this.moduleLocator.moduleExists(this.moduleName)) {
      return null;
    }
    return require(`${this.configRoutePath}${this.moduleLocator.getModule(this.moduleName).check}`);
  },
};

module.exports = ConfigReader;
