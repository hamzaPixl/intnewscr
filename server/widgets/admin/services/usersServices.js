const errors = require('../../../domain/models/errors');
const { userRepository } = require('../domain/repositories');
const { userFactory } = require('../domain/factories');

const SortConfigurationBuilder = require('../../../tools/mongo/SortConfigurationBuilder');
const FilterConfigurationBuilder = require('../../../tools//mongo/FilterConfigurationBuilder');
const SortFilterConfigurationBuilder = require('../../../tools/mongo/SortFilterConfigurationBuilder');

const sortConfiguration = new SortConfigurationBuilder();
const filterConfigurationBuilder = new FilterConfigurationBuilder();

sortConfiguration
  .addConfiguration('createdAt', 'createdAt')
  .addConfiguration('lastName', 'lastName')
  .addConfiguration('firstName', 'firstName')
  .addConfiguration('role', 'role')
  .setDefault('createdAt', false);

filterConfigurationBuilder
  .addConfiguration('general', 'role', false)
  .addConfiguration('general', 'lastName', false)
  .addConfiguration('general', 'firstName', false)
  .addConfiguration('general', 'id', false);

/**
 * Get profil from req
 *
 * @param {Object} user
 * @returns {Object} user
 */
async function getProfil(user) {
  return user;
}

/**
 * Get user by id
 *
 * @param {Object} admin
 * @param {String} id
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {NotFoundError} user does not exists
 */
async function getUser(admin, id) {
  admin.hasRight();
  const user = await userRepository.findOneId(id);
  if (!user) {
    throw new errors.NotFoundError('User was not found');
  }
  return user;
}

/**
 * Get all users
 *
 * @param {Object} admin
 * @returns {[Object]} users
 * @throws {AuthenticationError} user does not have access
 */
async function getAllUsers(admin, pagingSortingFiltering) {
  admin.hasRight();

  const sortFilterConfiguration = new SortFilterConfigurationBuilder(
    sortConfiguration.configurations,
    filterConfigurationBuilder.configurations
  );
  sortFilterConfiguration
    .page(pagingSortingFiltering.page)
    .sortBy(pagingSortingFiltering.sort);

  if (pagingSortingFiltering.sortDirection && pagingSortingFiltering.sortDirection === 'desc') {
    sortFilterConfiguration.descending();
  } else {
    sortFilterConfiguration.ascending();
  }

  pagingSortingFiltering.filters.forEach(f => sortFilterConfiguration.filterOn(f.name, f.value));

  return userRepository.findAll(sortFilterConfiguration);
}

/**
 * Add user
 *
 * @param {Object} admin
 * @param {Object} payload
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {ValidationError} user already exists
 */
async function addUser(admin, payload) {
  admin.hasRight();
  const userExists = await userRepository.findOne(payload.email);
  if (userExists) {
    throw new errors.ValidationError('User already exits');
  }
  const user = userFactory.createFromPayload(payload);
  await user.setPassword(user.password);

  return userRepository.save(user);
}

/**
 * Update existing user
 *
 * @param {Object} admin
 * @param {String} id
 * @param {Object} payload
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {ValidationError} user already exists with this id
 * @throws {NotFoundError} user does not exists
 */
async function updateUser(admin, id, payload) {
  const user = await getUser(admin, id);
  if (payload.email) {
    const userExists = await userRepository.findOne(payload.email);
    if (userExists && userExists.id !== id) {
      throw new errors.ValidationError(`A user already exists with the email ${payload.email}`);
    }
  }
  await user.mergeUpdate(payload);
  return userRepository.save(user);
}

/**
 * Delete existing user
 *
 * @param {Object} admin
 * @param {String} id
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {NotFoundError} user already exists
 */
async function deleteUser(admin, id) {
  const user = await getUser(admin, id);
  return userRepository.deleteOne(user._id);
}

module.exports = {
  getProfil,
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
