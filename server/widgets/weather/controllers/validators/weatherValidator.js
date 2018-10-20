const weatherSchema = {
  id: 'news',
  type: 'object',
  properties: {
    city: { type: 'string', minLength: 1 },
  },
  required: ['city'],
};

module.exports = weatherSchema;
