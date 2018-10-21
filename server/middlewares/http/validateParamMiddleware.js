const jsonSchemaValidator = require('../../tools/jsonSchemaValidator');
const errors = require('../../domain/models/errors');

module.exports = schema => (req, res, next) => {
  const jsonSchemaErrors = jsonSchemaValidator.validate(req.params, schema);

  if (jsonSchemaErrors) {
    return next(new errors.ValidationError('Param validation error', 'JSON-SCHEMA', jsonSchemaErrors));
  }

  return next();
};
