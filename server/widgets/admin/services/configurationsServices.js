const errors = require('../../../domain/models/errors');
const { configurationRepository } = require('../domain/repositories');
const { configurationFactory } = require('../domain/factories');

/**
 * Create a configuration for a user
 *
 * @param {Object} user
 * @param {Object} payload
 * @returns {Object} configuration
 */
async function createConfiguration(user, payload) {
  const configuration = configurationFactory.createFromPayload(payload);
  configuration.author = user.email;
  return configurationRepository.save(configuration);
}

/**
 * Get a list of all configurations
 *
 * @param {Object} user
 * @throws {AuthenticationError} user does not have access
 * @returns {Array[Object]} configurations
 */
async function getAllConfigurations(user) {
  if (user.role === 'admin') {
    return configurationRepository.findAllConfigurations();
  }
  return configurationRepository.findAllConfigurationsByUser(user.email);
}

/**
 * Get a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @throws {NotFoundError} configuration does not exists
 * @returns {Object} configuration
 */
async function getConfiguration(user, configurationId) {
  try {
    const configuration = await configurationRepository.findOne(user.email, configurationId);
    return configuration;
  } catch (error) {
    throw new errors.NotFoundError('Configuration was not found');
  }
}

/**
 * Update a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @param {Object} payload
 * @throws {NotFoundError} configuration does not exists
 * @returns {Object} configuration
 */
async function updateConfiguration(user, configurationId, payload) {
  const configuration = await getConfiguration(user, configurationId);
  configuration.mergeUpdate(payload);
  return configurationRepository.save(configuration);
}

/**
 * Delete a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @throws {NotFoundError} configuration does not exists
 * @returns {Object} configuration
 */
async function deleteConfiguration(user, configurationId) {
  await getConfiguration(user, configurationId);
  return configurationRepository.deleteOne(configurationId);
}

/**
 * Add a view to a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @param {Object} payload
 * @throws {NotFoundError} configuration does not exists
 * @returns {Object} view
 */
async function addView(user, configurationId, payload) {
  const configuration = await getConfiguration(user, configurationId);
  const view = configuration.addView(payload);
  await configurationRepository.save(configuration);
  return view;
}

/**
 * Get a specific view from a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @param {String} viewId
 * @throws {NotFoundError} configuration does not exists
 * @throws {NotFoundError} view does not exists
 * @returns {Object} view
 */
async function getView(user, configurationId, viewId) {
  const configuration = await getConfiguration(user, configurationId);
  const view = configuration.getView(viewId);
  if (!view) {
    throw new errors.NotFoundError('View was not found');
  }
  return view;
}

/**
 * Update a specific view from a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @param {String} viewId
 * @param {Object} payload
 * @throws {NotFoundError} configuration does not exists
 * @throws {NotFoundError} view does not exists
 * @returns {Object} view
 */
async function updateView(user, configurationId, viewId, payload) {
  const configuration = await getConfiguration(user, configurationId);
  let view = await getView(user, configurationId, viewId);
  view = configuration.updateView(viewId, payload);
  await configurationRepository.save(configuration);
  return view;
}

/**
 * Delete a specific view from a specific configuration
 *
 * @param {Object} user
 * @param {String} configurationId
 * @param {String} viewId
 * @throws {NotFoundError} configuration does not exists
 * @throws {NotFoundError} view does not exists
 * @returns {Object} configuration
 */
async function deleteView(user, configurationId, viewId) {
  const configuration = await getConfiguration(user, configurationId);
  await getView(user, configurationId, viewId);
  configuration.deleteView(viewId);
  return configurationRepository.save(configuration);
}

module.exports = {
  createConfiguration,
  getConfiguration,
  getAllConfigurations,
  updateConfiguration,
  deleteConfiguration,
  addView,
  getView,
  updateView,
  deleteView,
};
