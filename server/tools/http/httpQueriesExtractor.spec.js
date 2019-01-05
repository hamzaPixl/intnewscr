const httpQueriesExtractor = require('./httpQueriesExtractor');

describe('/INT NEWS SCREEN - tools - http - httpQueriesExtractor', () => {
  describe('extractSort()', () => {
    test('Should extract sort', () => {
      const req = {
        query: {
          sort: 'status',
        },
      };

      const sort = httpQueriesExtractor.extractSort(req.query);

      expect(sort).toBe('status');
    });
  });

  describe('extractSortDirection()', () => {
    test('Should extract sort direction', () => {
      const req = {
        query: {
          sortDirection: 'desc',
        },
      };

      const sortDirection = httpQueriesExtractor.extractSortDirection(req.query);

      expect(sortDirection).toBe('desc');
    });
  });

  describe('extractPage()', () => {
    test('Should extract page', () => {
      const req = {
        query: {
          page: '1',
        },
      };

      const page = httpQueriesExtractor.extractPage(req.query);

      expect(page).toBe(1);
    });

    test('Should extract negative page', () => {
      const req = {
        query: {
          page: '0',
        },
      };

      const page = httpQueriesExtractor.extractPage(req.query);

      expect(page).toBe(1);
    });
  });

  describe('extractFilters()', () => {
    test('Should extract filter', () => {
      const req = {
        query: {
          status: 'active',
        },
      };

      const filters = httpQueriesExtractor.extractFilters(req.query);

      expect(filters.length).toBe(1);
      expect(filters[0].name).toBe('status');
      expect(filters[0].value).toBe('active');
    });

    test('Should extract filter array', () => {
      const req = {
        query: {
          status: ['active', 'notStarted'],
        },
      };

      const filters = httpQueriesExtractor.extractFilters(req.query);

      expect(filters.length).toBe(2);
      expect(filters[0].name).toBe('status');
      expect(filters[0].value).toBe('active');
      expect(filters[1].name).toBe('status');
      expect(filters[1].value).toBe('notStarted');
    });
  });
});
