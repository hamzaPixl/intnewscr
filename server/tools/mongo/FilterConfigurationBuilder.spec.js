const FilterConfigurationBuilder = require('./FilterConfigurationBuilder');
const filterComparison = require('./filterComparison');

describe('INT NEWS SCR - tools - mongo - FilterConfigurationBuilder', () => {
  describe('addConfiguration()', () => {
    test('Should add configuration', () => {
      const builder = new FilterConfigurationBuilder();
      builder.addConfiguration('filterName', 'value');

      expect(builder.configurations.filterName.propertyNames.length).toBe(1);
      expect(builder.configurations.filterName.propertyNames[0]).toBe('value');
      expect(builder.configurations.filterName.exactMatch).toBe(true);
      expect(builder.configurations.filterName.allowedValue).toBe(undefined);
      expect(builder.configurations.filterName.comparison).toBe(filterComparison.eq);
    });

    test('Should add multiple configurations for the same filterName', () => {
      const builder = new FilterConfigurationBuilder();
      builder.addConfiguration('filterName', 'value1');
      builder.addConfiguration('filterName', 'value2');

      expect(builder.configurations.filterName.propertyNames.length).toBe(2);
      expect(builder.configurations.filterName.propertyNames[0]).toBe('value1');
      expect(builder.configurations.filterName.propertyNames[1]).toBe('value2');
      expect(builder.configurations.filterName.exactMatch).toBe(true);
      expect(builder.configurations.filterName.allowedValue).toBe(undefined);
      expect(builder.configurations.filterName.comparison).toBe(filterComparison.eq);
    });

    test('Should add configuration with no exact match', () => {
      const builder = new FilterConfigurationBuilder();
      builder.addConfiguration('filterName', 'value', false);

      expect(builder.configurations.filterName.propertyNames.length).toBe(1);
      expect(builder.configurations.filterName.propertyNames[0]).toBe('value');
      expect(builder.configurations.filterName.exactMatch).toBe(false);
      expect(builder.configurations.filterName.allowedValue).toBe(undefined);
      expect(builder.configurations.filterName.comparison).toBe(filterComparison.eq);
    });

    test('Should add configuration with allowed values', () => {
      const builder = new FilterConfigurationBuilder();
      builder.addConfiguration('filterName', 'value', true, ['v1', 'v2']);

      expect(builder.configurations.filterName.propertyNames.length).toBe(1);
      expect(builder.configurations.filterName.propertyNames[0]).toBe('value');
      expect(builder.configurations.filterName.exactMatch).toBe(true);
      expect(builder.configurations.filterName.allowedValue).toBe(undefined);
      expect(builder.configurations.filterName.comparison).toBe(filterComparison.eq);
    });

    test('Should add configuration with a comparison', () => {
      const builder = new FilterConfigurationBuilder();
      builder.addConfiguration('filterName', 'value', false, undefined, filterComparison.gte);

      expect(builder.configurations.filterName.propertyNames.length).toBe(1);
      expect(builder.configurations.filterName.propertyNames[0]).toBe('value');
      expect(builder.configurations.filterName.exactMatch).toBe(false);
      expect(builder.configurations.filterName.allowedValue).toBe(undefined);
      expect(builder.configurations.filterName.comparison).toBe(filterComparison.gte);
    });

    test('Should not add configuration with an invalid comparison', () => {
      const builder = new FilterConfigurationBuilder();
      try {
        builder.addConfiguration('filterName', 'value', false, undefined, 'test');
        throw new Error('Failing test');
      } catch (err) {
        expect(err.name).toBe('ValidationError');
        expect(err.message).toBe('Invalid comparison value');
      }
    });
  });
});
