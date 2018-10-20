const jsonSchemaValidator = require('../../tools/jsonSchemaValidator');
const errors = require('../../domain/models/errors');

module.exports = (schema, validator) => (req, res, next) => {
  let jsonSchemaErrors = null;

  if (!validator) {
    jsonSchemaErrors = jsonSchemaValidator.validate(req.body, schema);
  } else {
    jsonSchemaErrors = jsonSchemaValidator.validateWithValidator(req.body, schema, validator);
  }

  if (jsonSchemaErrors) {
    return next(new errors.ValidationError('Data validation error', 'JSON-SCHEMA', jsonSchemaErrors));
  }

  return next();
};
