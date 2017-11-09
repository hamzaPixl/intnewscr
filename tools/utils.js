/**
 * Check if the result is present
 * @param {any} results
 * @returns {boolean}
 */
function validateResult(results) {
  if (!results) {
    return false;
  }
  if (results.length === 0) {
    return false;
  }
  return true;
}

/**
 * Return only items that are available and still valid
 * @param {any} results
 * @param {any} model
 * @returns {array}
 */
function filterValid(results, model) {
  if (!validateResult) {
    return null;
  }
  return results.filter((result) => {
    model.fromdbPayload(result);
    return model.isValid();
  });
}

module.exports = {
  validateResult,
  filterValid,
};
