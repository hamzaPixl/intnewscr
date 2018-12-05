const configurationsSchema = {
  id: 'configuration',
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['name', 'description'],
};

module.exports = configurationsSchema;
