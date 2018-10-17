const mongoose = require('mongoose');
const config = require('config');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const news = new Schema({
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
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

news.plugin(mongoosePaginate);

news.index({ createdAt: 1 }, { expireAfterSeconds: config.get('services.news.ttl') });

module.exports = mongoose.model('News', news);
