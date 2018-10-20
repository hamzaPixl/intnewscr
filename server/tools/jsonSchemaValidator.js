const validateJson = require('jsonschema').validate;

function validate(data, schema) {
  return checkResultValidation(validateJson(data, schema));
}

function validateWithValidator(data, schema, validator) {
  return checkResultValidation(validator.validate(data, schema));
}

function checkResultValidation(validationResult) {
  if (validationResult.errors && validationResult.errors.length > 0) {
    const errorDetails = validationResult.errors.map(error =>
      ({
        property: error.property,
        message: error.message,
      }));
    return errorDetails;
  }
  return null;
}

module.exports = {
  validate,
  validateWithValidator,
};
