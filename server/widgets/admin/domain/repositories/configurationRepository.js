const Configurations = require('../models/Configurations');

/**
 * Save a new configuration in the database
 * @param {Configurations} configuration
 * @returns {Configurations} the configuration saved
 */
function save(configuration) {
  return configuration.save()
    .then(() => configuration);
}

/**
 * Retrieve configuration by its id and author
 * @returns {Configurations}
 */
function findOne(author, id) {
  return Configurations.findOne({ author, _id: id });
}

/**
 * Retrieve all configurations
 * @returns {Array[Configurations]}
 */
function findAllConfigurations() {
  return Configurations.find({ });
}

/**
 * Retrieve all configurations by user
 * @returns {Array[Configurations]}
 */
function findAllConfigurationsByUser(author) {
  return Configurations.find({ author });
}

/**
 * Delete a configuration from the database
 * @param {ObjectId} id
 * @returns {}
 */
function deleteOne(id) {
  return Configurations.deleteOne({ _id: id });
}


module.exports = {
  save,
  findAllConfigurations,
  findAllConfigurationsByUser,
  findOne,
  deleteOne,
};
