const configurationsSchema = {
  id: 'configuration',
  type: 'object',
  properties: {
    name: { type: 'name' },
    description: { type: 'description' },
  },
  required: ['name', 'description'],
};

module.exports = configurationsSchema;
