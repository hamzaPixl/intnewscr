const { get } = require('lodash');
const WhiteLabel = require('../models/WhiteLabel');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new WhiteLabel({
    name: payload.name,
    primary: payload.primary,
    light: {
      accent: get(payload, 'light.accent'),
      shades: get(payload, 'light.shades'),
    },
    dark: {
      accent: get(payload, 'dark.accent'),
      shades: get(payload, 'dark.shades'),
    },
  });
}

module.exports = {
  createFromPayload,
};
