const userSchema = {
  id: 'user',
  type: 'object',
  properties: {
    email: { type: 'email' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password', 'firstName', 'lastName'],
};

module.exports = userSchema;
