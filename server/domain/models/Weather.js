const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const weather = new Schema({
  astronomy : {
    type: String,
    required: false,
  },
  location : {
    type: String,
    required: false,
  },
  units : {
    type: String,
    required: false,
  },
  wind : {
    type: String,
    required: false,
  },
  code : {
    type: String,
    required: false,
  },
  date : {
    type: String,
    required: false,
  },
  day : {
    type: String,
    required: false,
  },
  high : {
    type: Number,
    required: false,
  },
  low : {
    type: Number,
    required: false,
  },
  text : {
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

weather.index({ 'expireAT': 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Weather', weather);
