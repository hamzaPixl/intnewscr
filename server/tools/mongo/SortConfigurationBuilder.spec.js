const SortConfigurationBuilder = require('./SortConfigurationBuilder');

describe('INT NEWS SCR - tools - mongo - SortConfigurationBuilder', () => {
  describe('addConfiguration()', () => {
    test('Should add configuration', () => {
      const builder = new SortConfigurationBuilder();
      builder.addConfiguration('sortName', 'value');

      expect(builder.configurations.sortName.propertyNames.length).toBe(1);
      expect(builder.configurations.sortName.propertyNames[0]).toBe('value');
    });

    test('Should add multiple configurations for the same sortName', () => {
      const builder = new SortConfigurationBuilder();
      builder.addConfiguration('sortName', 'value1');
      builder.addConfiguration('sortName', 'value2');

      expect(builder.configurations.sortName.propertyNames.length).toBe(2);
      expect(builder.configurations.sortName.propertyNames[0]).toBe('value1');
      expect(builder.configurations.sortName.propertyNames[1]).toBe('value2');
    });

    test('Should set default sortering', () => {
      const builder = new SortConfigurationBuilder();
      builder.addConfiguration('sortName', 'value')
        .setDefault('sortName');

      expect(builder.configurations.sortName.propertyNames.length).toBe(1);
      expect(builder.configurations.sortName.propertyNames[0]).toBe('value');
      expect(builder.configurations.sortName.isDefault).toBe(true);
      expect(builder.configurations.sortName.isAscending).toBe(true);
    });

    test('Should set default sortering and direction', () => {
      const builder = new SortConfigurationBuilder();
      builder.addConfiguration('sortName', 'value')
        .setDefault('sortName', false);

      expect(builder.configurations.sortName.propertyNames.length).toBe(1);
      expect(builder.configurations.sortName.propertyNames[0]).toBe('value');
      expect(builder.configurations.sortName.isDefault).toBe(true);
      expect(builder.configurations.sortName.isAscending).toBe(false);
    });

    test('Should reset default sortering', () => {
      const builder = new SortConfigurationBuilder();

      builder
        .addConfiguration('sortName', 'value')
        .addConfiguration('sortName1', 'value1')
        .setDefault('sortName');

      expect(builder.configurations.sortName.isDefault).toBe(true);
      expect(builder.configurations.sortName.isAscending).toBe(true);
      expect(builder.configurations.sortName1.isDefault).toBe(false);

      builder.setDefault('sortName1');
      expect(builder.configurations.sortName1.isDefault).toBe(true);
      expect(builder.configurations.sortName1.isAscending).toBe(true);
      expect(builder.configurations.sortName.isDefault).toBe(false);
    });
  });
});
