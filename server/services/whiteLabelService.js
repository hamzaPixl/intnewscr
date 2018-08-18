const { whiteLabelRepository } = require('../domain/repositories');
const { whiteLabelFactory } = require('../domain/factories');

/**
 * Get a white label from database
 * @param {id} id
 */
function get(id) {
  return whiteLabelRepository.get(id)
  .then(whiteLabelFactory.createFromPayload);
}

/**
 * Create white label and save it
 * @param {JSON} payload
 */
function create(payload) {
  const whiteLabel = whiteLabelFactory.createFromPayload(payload);
  return whiteLabelRepository.save(whiteLabel);
}

/**
 * Update a white label item in database
 * @param {id} id
 * @param {JSON} payload
 */
function update(id, payload) {
  return get(id)
  .then((whiteLabel) => {
    if (!whiteLabel) {
      return null;
    }
    whiteLabel.mergeUpdate(payload);
    return whiteLabelRepository.save(whiteLabel);
  });
}
/**
 * Remove white label from the database
 * @param {id} id
 */
function remmove(id) {
  return whiteLabelRepository.remmove(id)
  .then(() => {});
}

module.exports = {
  get,
  create,
  update,
  remmove,
};
