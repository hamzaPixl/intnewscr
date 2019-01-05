/**
 * Allows to build the sort and filters that we want to apply on the collection
 *
 * @param {Object} sortConfiguration - A list of sort configurations build with the SortConfigurationBuilder
 * @param {Object} filterConfiguration - A list of filter configurations build with the FilterConfigurationBuilder
 * @param {Objectany} sortFilterPagingObject - The object generated with httpQueriesExtractor
 */
function Builder(sortConfiguration = {}, filterConfiguration = {}, sortFilterPagingObject) {
  this.pageNumber = 1;
  this.sort = null;
  this.isSortDirectionAscending = true;
  this.sortConfiguration = sortConfiguration;
  this.filterConfiguration = filterConfiguration;
  this.filters = {};

  // set default sort and sort direction if exists in sortConfiguration
  const defaultSortKey = Object.keys(sortConfiguration).find(k => sortConfiguration[k].isDefault);

  if (defaultSortKey) {
    this.sort = sortConfiguration[defaultSortKey].propertyNames;
    this.isSortDirectionAscending = sortConfiguration[defaultSortKey].isAscending;
  }

  if (sortFilterPagingObject) {
    processSortFilterPagingObject(this, sortFilterPagingObject);
  }
}

function processSortFilterPagingObject(sortFilterConfiguration, sortFilterPagingObject) {
  sortFilterConfiguration
  .page(sortFilterPagingObject.page)
  .sortBy(sortFilterPagingObject.sort);

  if (sortFilterPagingObject.sortDirection && sortFilterPagingObject.sortDirection === 'desc') {
    sortFilterConfiguration.descending();
  } else {
    sortFilterConfiguration.ascending();
  }

  sortFilterPagingObject.filters.forEach(f => sortFilterConfiguration.filterOn(f.name, f.value));
}

Builder.prototype.page = function page(pageNumber) {
  this.pageNumber = pageNumber || 1;
  return this;
};

Builder.prototype.sortBy = function setSortBy(sortBy) {
  if (this.sortConfiguration[sortBy]) {
    this.sort = this.sortConfiguration[sortBy].propertyNames;
  }

  return this;
};

Builder.prototype.ascending = function ascending() {
  this.isSortDirectionAscending = true;
  return this;
};

Builder.prototype.descending = function descending() {
  this.isSortDirectionAscending = false;
  return this;
};

Builder.prototype.filterOn = function filterOn(name, value) {
  if (!this.filterConfiguration[name]) {
    return this;
  }

  const configuration = this.filterConfiguration[name];

  // if the value must be validated
  if (configuration.allowedValues && !configuration.allowedValues.includes(value)) {
    return this;
  }

  // Single property name mapping -> simple mapping
  if (configuration.propertyNames.length <= 1) {
    if (!this.filters[configuration.propertyNames[0]]) {
      this.filters[configuration.propertyNames[0]] = {};
    }

    if (configuration.exactMatch) {
      this.filters[configuration.propertyNames[0]][configuration.comparison] = buildFilterValue(configuration.exactMatch, value);
    } else {
      this.filters[configuration.propertyNames[0]].regex = buildFilterValue(configuration.exactMatch, value);
    }
  } else {
    // Multi property name mapping -> build as an OR object
    this.filters.or = configuration.propertyNames.map(pn => buildFilterProperty(pn, configuration.exactMatch, value, configuration.comparison));
  }

  return this;
};

function buildFilterProperty(propertyName, exactMatch, value) {
  return {
    [propertyName]: buildFilterValue(exactMatch, value),
  };
}

function buildFilterValue(exactMatch, value) {
  return exactMatch ? value : new RegExp(regexEscape(value), 'i');
}

function regexEscape(str) {
  return (`${str}`).replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

module.exports = Builder;
