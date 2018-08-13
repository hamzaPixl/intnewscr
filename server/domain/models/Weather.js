const mongoose = require('mongoose');
const config = require('config');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const weather = new Schema({
  astronomy: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  units: {
    type: String,
    required: false,
  },
  wind: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  day: {
    type: String,
    required: false,
  },
  high: {
    type: Number,
    required: false,
  },
  low: {
    type: Number,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: undefined,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  usePushEach: true,
});

weather.plugin(mongoosePaginate);

weather.index({ expireAt: 1 }, { expireAfterSeconds: config.get('services.weather.ttl') });

module.exports = mongoose.model('Weather', weather);
