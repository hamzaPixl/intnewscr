const viewSchema = {
  id: 'view',
  type: 'object',
  properties: {
    name: { type: 'string' },
    widget: { type: 'string' },
    path: { type: 'string' },
    queryParams: { type: 'string' },
  },
  required: ['name', 'queryParams', 'widget', 'path'],
};

module.exports = viewSchema;
