class ApiError extends Error {
  constructor(message, error) {
    super(message || 'API error', error);

    this.name = 'ApiError';

    return this;
  }
}

module.exports = ApiError;
