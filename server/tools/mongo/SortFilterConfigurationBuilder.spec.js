const SortFilterConfigurationBuilder = require('./SortFilterConfigurationBuilder');

const FilterConfigurationBuilder = require('./FilterConfigurationBuilder');
const SortConfigurationBuilder = require('./SortConfigurationBuilder');
const filterComparison = require('./filterComparison');

describe('INT NEW SCR - tools - mongo - SortFilterConfigurationBuilder', () => {
  describe('filterOn()', () => {
    test('Should use simple filter configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(builder.filters['innerProperty.status'].eq).toBe('active');
    });

    test('Should use multiple filter configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');
      filterBuilder.addConfiguration('ph', 'policyholder');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');
      builder.filterOn('ph', 'qover');

      expect(builder.filters['innerProperty.status'].eq).toBe('active');
      expect(builder.filters.policyholder.eq).toBe('qover');
    });

    test('Should use multiple filter properties configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');
      filterBuilder.addConfiguration('status', 'innerProperty.status_bis');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(builder.filters.or.length).toBe(2);
      expect(builder.filters.or[0]['innerProperty.status']).toBe('active');
      expect(builder.filters.or[1]['innerProperty.status_bis']).toBe('active');
    });

    test('Should skip filter value if not in configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');
      builder.filterOn('ph', 'qover');

      expect(Object.keys(builder.filters).length).toBe(1);
      expect(builder.filters['innerProperty.status'].eq).toBe('active');
    });

    test('Should add filter value if in allowed values', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status', true, ['active']);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(builder.filters['innerProperty.status'].eq).toBe('active');
    });

    test('Should not add filter value if not in allowed values', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status', true, ['notStarted']);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(Object.keys(builder.filters).length).toBe(0);
    });

    test('Should add filter value with a regex', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status', false);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(builder.filters['innerProperty.status'].regex.toString()).toBe('/active/i');
    });

    test('Should add filter value with a regex and skip specific comparison', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('status', 'innerProperty.status', false, undefined, filterComparison.gte); // we specify gte but because we also want regex, it will not be used

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('status', 'active');

      expect(builder.filters['innerProperty.status'].regex.toString()).toBe('/active/i');
    });

    test('Should add filter value with multiple filters', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      filterBuilder.addConfiguration('start', 'innerProperty.date', true, undefined, filterComparison.gte);
      filterBuilder.addConfiguration('end', 'innerProperty.date', true, undefined, filterComparison.lte);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.filterOn('start', '2018-11-01T09:06:53.627Z');
      builder.filterOn('end', '2018-11-10T09:06:53.627Z');

      expect(builder.filters['innerProperty.date'].gte).toBe('2018-11-01T09:06:53.627Z');
      expect(builder.filters['innerProperty.date'].lte).toBe('2018-11-10T09:06:53.627Z');
    });
  });

  describe('sortBy()', () => {
    test('Should use simple sort configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.sortBy('status');

      expect(builder.sort.length).toBe(1);
      expect(builder.sort[0]).toBe('innerProperty.status');
      expect(builder.isSortDirectionAscending).toBe(true);
    });

    test('Should use multiple sort columns configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');
      sortBuilder.addConfiguration('status', 'innerProperty.status_bis');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.sortBy('status');

      expect(builder.sort.length).toBe(2);
      expect(builder.sort[0]).toBe('innerProperty.status');
      expect(builder.sort[1]).toBe('innerProperty.status_bis');
      expect(builder.isSortDirectionAscending).toBe(true);
    });

    test('Should use simple sort configuration with descending', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.sortBy('status').descending();

      expect(builder.sort.length).toBe(1);
      expect(builder.sort[0]).toBe('innerProperty.status');
      expect(builder.isSortDirectionAscending).toBe(false);
    });

    test('Should not use sort if not in configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status');

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      builder.sortBy('ph');

      expect(builder.sort).toBe(null);
    });

    test('Should sort with default configuration', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      sortBuilder.addConfiguration('status', 'innerProperty.status')
        .setDefault('status', false);

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      expect(builder.sort.length).toBe(1);
      expect(builder.sort[0]).toBe('innerProperty.status');
      expect(builder.isSortDirectionAscending).toBe(false);
    });

    test(
      'Should not sort with default configuration if sort not in configuration',
      () => {
        const filterBuilder = new FilterConfigurationBuilder();
        const sortBuilder = new SortConfigurationBuilder();

        sortBuilder.addConfiguration('status', 'innerProperty.status')
          .setDefault('ph', false);

        const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

        expect(builder.sort).toBe(null);
      }
    );
  });

  describe('page()', () => {
    test('Should define page', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);
      builder.page(2);

      expect(builder.pageNumber).toBe(2);
    });

    test('Should define default page', () => {
      const filterBuilder = new FilterConfigurationBuilder();
      const sortBuilder = new SortConfigurationBuilder();

      const builder = new SortFilterConfigurationBuilder(sortBuilder.configurations, filterBuilder.configurations);

      expect(builder.pageNumber).toBe(1);
    });
  });
});
