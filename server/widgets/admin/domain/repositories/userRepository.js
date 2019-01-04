const config = require('config');
const Users = require('../models/Users');
const mongoQueryBuilder = require('../../../../tools/mongo/mongoQueryBuilder');

/**
 * Save a new user in the database
 * @param {Users} user
 * @returns {Users} the user saved
 */
function save(user) {
  return user.save()
    .then(() => user);
}

/**
 * Retrieve user by its id
 * @returns {Users}
 */
function findOneId(id) {
  return Users.findOne({ _id: id });
}

/**
 * Retrieve user by its email
 * @returns {Users}
 */
function findOne(email) {
  return Users.findOne({ email });
}

/**
 * Retrieve all users
 * @param {Object} sortFilterConfiguration
 * @returns {Array[Users]}
 */
function findAll(sortFilterConfiguration) {
  const options = {
    select: 'id role firstName lastName email createdAt',
    sort: {},
    lean: false,
    page: sortFilterConfiguration.pageNumber,
    limit: config.pageSize,
  };

  const query = mongoQueryBuilder.buildFilter(sortFilterConfiguration);
  options.sort = mongoQueryBuilder.buildSort(sortFilterConfiguration);

  return Users.paginate(query, options);
}

/**
 * Retrieve all user by role
 * @returns {Array[Users]}
 */
function findAllByRole(role) {
  return Users.find({ role });
}

/**
 * Delete a user from the database
 * @param {ObjectId} id
 * @returns {}
 */
function deleteOne(id) {
  return Users.deleteOne({ _id: id });
}


module.exports = {
  save,
  findOneId,
  deleteOne,
  findAllByRole,
  findOne,
  findAll,
};
