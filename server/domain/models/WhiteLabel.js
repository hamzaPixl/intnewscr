const { has } = require('lodash');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const whiteLabel = new Schema({
  name: {
    type: String,
    required: false,
  },
  primary: {
    type: String,
    required: false,
  },
  dark: {
    shades: {
      type: String,
      required: false,
    },
    accent: {
      type: String,
      required: false,
    },
  },
  light: {
    shades: {
      type: String,
      required: false,
    },
    accent: {
      type: String,
      required: false,
    },
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

whiteLabel.plugin(mongoosePaginate);

whiteLabel.methods.mergeUpdate = function mergeUpdate(payload) {
  if (has(payload, 'name')) {
    this.name = payload.name;
  }

  if (has(payload, 'primary')) {
    this.primary = payload.primary;
  }

  if (has(payload, 'dark')) {
    this.dark = {};
    if (has(payload, 'dark.shades')) {
      this.dark.shades = payload.dark.shades;
    }
    if (has(payload, 'dark.accent')) {
      this.dark.accent = payload.dark.accent;
    }
  }

  if (has(payload, 'light')) {
    this.light = {};
    if (has(payload, 'light.shades')) {
      this.light.shades = payload.light.shades;
    }
    if (has(payload, 'light.accent')) {
      this.light.accent = payload.light.accent;
    }
  }
};

module.exports = mongoose.model('WhiteLabel', whiteLabel);
