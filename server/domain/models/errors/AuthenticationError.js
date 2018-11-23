class AuthenticationError extends Error {
  constructor(message) {
    super(message || 'Authentication Error');

    this.name = 'AuthenticationError';

    return this;
  }
}

module.exports = AuthenticationError;
