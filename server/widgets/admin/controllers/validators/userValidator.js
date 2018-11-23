const userSchema = {
  id: 'user',
  type: 'object',
  properties: {
    email: { type: 'email' },
    firstName: { type: 'firstName' },
    lastName: { type: 'lastName' },
    password: { type: 'string' },
  },
  required: ['email', 'password', 'firstName', 'lastName'],
};

module.exports = userSchema;
