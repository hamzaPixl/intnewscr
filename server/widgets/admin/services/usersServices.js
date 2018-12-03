const errors = require('../../../domain/models/errors');
const { userRepository } = require('../domain/repositories');
const { userFactory } = require('../domain/factories');

/**
 * Verify that the user has right access
 *
 * @param {Object} user
 * @throws {AuthenticationError} user does not have access
 */
function userHasRight(user) {
  const hasRight = user.role === 'admin';
  if (!hasRight) {
    throw new errors.AuthenticationError('You dont have right to this action');
  }
}

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
 * Get user
 *
 * @param {Object} admin
 * @param {String} email
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {NotFoundError} user does not exists
 */
async function getUser(admin, email) {
  userHasRight(admin);
  const user = await userRepository.findOne(email);
  if (!user) {
    throw new errors.NotFoundError('User was not found');
  }
  return user;
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
  userHasRight(admin);
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
 * @param {String} email
 * @param {Object} payload
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {ValidationError} user already exists with this email
 * @throws {NotFoundError} user does not exists
 */
async function updateUser(admin, email, payload) {
  const user = await getUser(admin, email);
  if (payload.email) {
    const userExists = await getUser(admin, payload.email);
    if (userExists) {
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
 * @param {String} email
 * @returns {Object} user
 * @throws {AuthenticationError} user does not have access
 * @throws {NotFoundError} user already exists
 */
async function deleteUser(admin, email) {
  const user = await getUser(admin, email);
  return userRepository.deleteOne(user._id);
}

module.exports = {
  getProfil,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
