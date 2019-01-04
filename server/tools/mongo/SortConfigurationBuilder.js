/**
 * Allows to build a list of configuration mapping between the sort asked from the http
 * and the property name(s) we need to map on the (mongo) document
 *
 */
function Builder() {
  this.configurations = {};
}

/**
 * Add a configuration
 *
 * @param {String} filterName - The filter name
 * @param {String} propertyName - The property we need to map to
 * @returns
 */
Builder.prototype.addConfiguration = function addConfiguration(filterName, propertyName) {
  if (!this.configurations[filterName]) {
    this.configurations[filterName] = {
      propertyNames: [],
    };
  }

  this.configurations[filterName].propertyNames.push(propertyName);

  return this;
};

/**
 * Define the default sort name and direction
 *
 * @param {String} filterName
 * @param {boolean} [isAscending=true]
 */
Builder.prototype.setDefault = function setDefault(filterName, isAscending = true) {
  Object.keys(this.configurations).forEach((key) => {
    this.configurations[key].isDefault = false;
  });

  if (this.configurations[filterName]) {
    this.configurations[filterName].isDefault = true;
    this.configurations[filterName].isAscending = isAscending;
  }
};


module.exports = Builder;
