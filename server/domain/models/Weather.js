const mongoose = require('mongoose');
const config = require('config');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const weather = new Schema({
  location: {
    type: String,
    required: false,
  },
  units: {
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  usePushEach: true,
});

weather.plugin(mongoosePaginate);

weather.index({ createdAt: 1 }, { expireAfterSeconds: config.get('services.weather.ttl') });

module.exports = mongoose.model('Weather', weather);
