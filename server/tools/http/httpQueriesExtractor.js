const extractPage = function extractPage(query) {
  if (!query.page) {
    return 1;
  }

  const page = parseInt(query.page, 10);
  return page <= 0 ? 1 : page;
};

const extractSort = function extractSort(query) {
  return query.sort;
};

const extractSortDirection = function extractSortDirection(query) {
  return query.sortDirection;
};

const extractFilters = function extractFilters(query) {
  const filters = [];
  const excludeKeysList = ['sort', 'sortDirection', 'page'];

  Object.keys(query)
    .filter(k => !excludeKeysList.includes(k))
    .forEach((key) => {
      // if the content is an array, we add all the elements in the array
      if (isArray(query[key])) {
        query[key].forEach((value) => {
          filters.push(buildFilterObject(key, value));
        });
      } else {
        filters.push(buildFilterObject(key, query[key]));
      }
    });

  return filters;
};

const buildSortFilterPagingObject = function buildSortFilterPagingObject(query) {
  return {
    page: extractPage(query),
    sort: extractSort(query),
    sortDirection: extractSortDirection(query),
    filters: extractFilters(query),
  };
};

function buildFilterObject(name, value) {
  return {
    name,
    value: decodeURI(value),
  };
}

function isArray(obj) {
  return Array.isArray(obj);
}

module.exports = {
  extractPage,
  extractSort,
  extractSortDirection,
  extractFilters,
  buildSortFilterPagingObject,
};
