const Configurations = require('../models/Configurations');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new Configurations({
    name: payload.name,
    description: payload.description,
    author: payload.author,
  });
}

module.exports = {
  createFromPayload,
};
