const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const users = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
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

/**
 * Change the role of a user.
 *
 * @param {['client', 'admin']} role
 * @return {User}
 */
users.methods.setRole = function setRole(role) {
  this.role = role;
  return this;
};

module.exports = mongoose.model('Users', users);
