const Views = require('../models/Views');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new Views({
    name: payload.name,
    widget: payload.widget,
    path: payload.path,
    queryParams: payload.queryParams,
  });
}

module.exports = {
  createFromPayload,
};
