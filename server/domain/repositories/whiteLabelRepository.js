const WhiteLabel = require('../models/WhiteLabel');

/**
 * Save a new whiteLabel in the database
 * @param {WhiteLabel} whiteLabel
 * @returns {WhiteLabel} the whiteLabel saved
 */
function save(whiteLabel) {
  return whiteLabel.save()
    .then(() => whiteLabel);
}

function get(id) {
  return WhiteLabel.find({ _id: id });
}

function remove(id) {
  return WhiteLabel.remove({ _id: id });
}

module.exports = {
  save,
  get,
  remove,
};
