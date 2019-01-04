const SortFilterConfigurationBuilder = require('./SortFilterConfigurationBuilder');
const FilterConfigurationBuilder = require('./FilterConfigurationBuilder');
const SortConfigurationBuilder = require('./SortConfigurationBuilder');
const mongoQueryBuilder = require('./mongoQueryBuilder');
const filterComparison = require('./filterComparison');

describe('INT NEWS SCR - tools - mongo - mongoQueryBuilder', () => {
  describe('buildFilter()', () => {
    test('Should create filter query', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.filterOn('status', 'active');

      const filters = mongoQueryBuilder.buildFilter(builder);

      expect(Object.keys(filters).length).toBe(1);
      expect(filters['innerProperty.status'].$eq).toBe('active');
    });

    test('Should create filter query for multiple properties (or)', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');
      filterBuilder.addConfiguration('status', 'innerProperty.status_bis');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.filterOn('status', 'active');

      const filters = mongoQueryBuilder.buildFilter(builder);

      expect(filters.$or.length).toBe(2);
      expect(filters.$or[0]['innerProperty.status']).toBe('active');
      expect(filters.$or[1]['innerProperty.status_bis']).toBe('active');
    });

    test('Should create filter for multi properties (and)', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('start', 'innerProperty.date', true, undefined, filterComparison.gte);
      filterBuilder.addConfiguration('end', 'innerProperty.date', true, undefined, filterComparison.lte);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.filterOn('start', '2018-11-01T09:06:53.627Z');
      builder.filterOn('end', '2018-11-10T09:06:53.627Z');

      const filters = mongoQueryBuilder.buildFilter(builder);

      expect(Object.keys(filters).length).toBe(1);
      expect(filters['innerProperty.date'].$gte).toBe('2018-11-01T09:06:53.627Z');
      expect(filters['innerProperty.date'].$lte).toBe('2018-11-10T09:06:53.627Z');
    });
  });

  describe('buildSort()', () => {
    test('Should create sort query ', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.sortBy('status');

      const sort = mongoQueryBuilder.buildSort(builder);

      expect(Object.keys(sort).length).toBe(1);
      expect(sort['innerProperty.status']).toBe(1);
    });

    test('Should create sort query descending', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.sortBy('status').descending();

      const sort = mongoQueryBuilder.buildSort(builder);

      expect(Object.keys(sort).length).toBe(1);
      expect(sort['innerProperty.status']).toBe(-1);
    });

    test('Should create sort query with multiple properties', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');
      sortBuilder.addConfiguration('status', 'innerProperty.status_bis');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.sortBy('status');

      const sort = mongoQueryBuilder.buildSort(builder);

      expect(Object.keys(sort).length).toBe(2);
      expect(sort['innerProperty.status']).toBe(1);
      expect(sort['innerProperty.status_bis']).toBe(1);
    });
  });
});
