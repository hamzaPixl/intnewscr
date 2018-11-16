const Users = require('../models/Users');

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
  return Users.deleteOne({ id });
}


module.exports = {
  save,
  deleteOne,
  findAllByRole,
};
