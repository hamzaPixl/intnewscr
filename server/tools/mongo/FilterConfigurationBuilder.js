const filterComparison = require('./filterComparison');
const errors = require('../../domain/models/errors');

/**
 * Allows to build a list of configuration mapping between the filters asked from the http
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
 * @param {boolean} [exactMatch=true] - if [false], acts as a 'like' in SQL
 * @param {array} allowedValues - Allowed  values in the values
 * @param {filterComparison} comparison - The comparison to use. By default, equality
 * @returns
 */
Builder.prototype.addConfiguration = function addConfiguration(filterName, propertyName, exactMatch = true, allowedValues = undefined, comparison = filterComparison.eq) {
  if (!filterComparison[comparison]) {
    throw new errors.ValidationError('Invalid comparison value');
  }

  if (!this.configurations[filterName]) {
    this.configurations[filterName] = {
      propertyNames: [],
      exactMatch,
      allowedValues,
      comparison,
    };
  }

  this.configurations[filterName].propertyNames.push(propertyName);

  return this;
};

module.exports = Builder;
