const mongoose = require('mongoose');
const { has } = require('lodash');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const views = new Schema({
  name: {
    type: String,
    required: true,
  },
  widget: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  queryParams: {
    type: String,
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

views.plugin(mongoosePaginate);

views.methods.mergeUpdate = function mergeUpdate(payload) {
  if (has(payload, 'name')) {
    this.name = payload.name;
  }
  if (has(payload, 'widget')) {
    this.widget = payload.widget;
  }
  if (has(payload, 'path')) {
    this.path = payload.path;
  }
  if (has(payload, 'queryParams')) {
    this.queryParams = payload.queryParams;
  }
  return this;
};

module.exports = mongoose.model('Views', views);
