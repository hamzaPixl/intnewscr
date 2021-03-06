const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { has } = require('lodash');
const mongoosePaginate = require('mongoose-paginate');
const errors = require('../../../../domain/models/errors');

const { Schema } = mongoose;

const users = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  usePushEach: true,
});

users.plugin(mongoosePaginate);

users.methods.mergeUpdate = async function mergeUpdate(payload) {
  if (has(payload, 'fristName')) {
    this.firstName = payload.firstName;
  }
  if (has(payload, 'lastName')) {
    this.lastName = payload.lastName;
  }
  if (has(payload, 'email')) {
    this.email = payload.email;
  }
  if (has(payload, 'role')) {
    this.setRole(payload.role);
  }
  if (has(payload, 'password')) {
    await this.setPassword(payload.password);
  }
  return this;
};

/**
 * Verify that the user has right access
 *
 * @param {Object} user
 * @throws {AuthenticationError} user does not have access
*/
users.methods.hasRight = function hasRight() {
  if (this.role !== 'admin') {
    throw new errors.AuthenticationError('You dont have right to this action');
  }
};

/**
 * Change the role of a user
 *
 * @param {['client', 'admin']} role
 * @return {User}
 */
users.methods.setRole = function setRole(role) {
  this.role = role;
  return this;
};

/**
 * Hash the password of the user.
 *
 * @param {String} password
 * @return {User}
 */
users.methods.setPassword = async function setPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
  return this;
};

/**
 * Compare the password.
 *
 * @param {String} password
 * @return {User}
 */
users.methods.isValidPassword = async function isValidPassword(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

module.exports = mongoose.model('Users', users);
