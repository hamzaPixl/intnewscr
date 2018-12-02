const viewSchema = {
  id: 'view',
  type: 'object',
  properties: {
    name: { type: 'name' },
    widget: { type: 'widget' },
    path: { type: 'path' },
    queryParams: { type: 'string' },
  },
  required: ['name', 'queryParams', 'widget', 'path'],
};

module.exports = viewSchema;
