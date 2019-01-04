/**
 * Build the mongo sort query based on the sortFilterConfiguration
 *
 * @param {SortFilterConfiguration} sortFilterConfiguration - created with SortFilterConfigurationBuilder
 * @returns the sort query
 */
const buildSort = function buildSort(sortFilterConfiguration) {
  const result = {};

  if (sortFilterConfiguration.sort) {
    sortFilterConfiguration.sort.forEach((s) => {
      result[s] = sortFilterConfiguration.isSortDirectionAscending ? 1 : -1;
    });
  }

  return result;
};

const createQueryBasedOnConfiguration = function createQueryBasedOnConfiguration(sortFilterConfiguration) {
  const query = {};

  Object.keys(sortFilterConfiguration.filters).forEach((filterKey) => {
    if (filterKey === 'or') {
      query.$or = sortFilterConfiguration.filters[filterKey];
    } else {
      const filterObject = {};

      Object.keys(sortFilterConfiguration.filters[filterKey]).forEach((comparison) => {
        filterObject[`$${comparison}`] = sortFilterConfiguration.filters[filterKey][comparison];
      });

      query[filterKey] = filterObject;
    }
  });

  return query;
};

/**
 * Build the mongo filter query based on the sortFilterConfiguration
 *
 * @param {SortFilterConfiguration} sortFilterConfiguration - created with SortFilterConfigurationBuilder
 * @returns
 */
const buildFilter = function buildFilter(sortFilterConfiguration) {
  const query = createQueryBasedOnConfiguration(sortFilterConfiguration);

  return query;
};

module.exports = {
  buildSort,
  buildFilter,
};
