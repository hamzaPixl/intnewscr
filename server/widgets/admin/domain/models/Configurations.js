const mongoose = require('mongoose');
const { has } = require('lodash');
const mongoosePaginate = require('mongoose-paginate');
const errors = require('../../../../domain/models/errors');
const Views = require('./Views');
const viewFactory = require('../factories/viewFactory');

const { Schema } = mongoose;

const configurations = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  views: {
    type: [Views.schema],
    required: false,
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

configurations.plugin(mongoosePaginate);

configurations.methods.mergeUpdate = function mergeUpdate(payload) {
  if (has(payload, 'name')) {
    this.name = payload.name;
  }
  if (has(payload, 'description')) {
    this.description = payload.description;
  }
  if (has(payload, 'author')) {
    this.author = payload.author;
  }
  return this;
};

configurations.methods.getView = function getView(viewId) {
  if (!this.views || !this.views.length) {
    return null;
  }
  return this.views.find(v => `${v._id}` === viewId);
};

configurations.methods.addView = function addView(payload) {
  if (!this.views || !this.views.length) {
    this.views = [];
  }

  if (this.views.length === 10) {
    throw new errors.ValidationError('You have enough views on this configuration.');
  }

  const view = viewFactory.createFromPayload(payload);
  this.views.push(view);
  return view;
};

configurations.methods.updateView = function updateView(id, payload) {
  const view = this.views.find(v => `${v._id}` === id);
  if (!view) {
    throw new errors.NotFoundError('View not found');
  }
  return view.mergeUpdate(payload);
};

configurations.methods.deleteView = function deleteView(id) {
  const view = this.views.find(v => `${v._id}` === id);
  if (!view) {
    throw new errors.NotFoundError('View not found');
  }
  this.views = this.views.filter(v => `${v._id}` !== id);
  return this;
};

module.exports = mongoose.model('Configurations', configurations);
