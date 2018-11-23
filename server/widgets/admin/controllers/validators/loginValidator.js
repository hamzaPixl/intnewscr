const loginSchema = {
  id: 'login',
  type: 'object',
  properties: {
    email: { type: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
};

module.exports = loginSchema;
