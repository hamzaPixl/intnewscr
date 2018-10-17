const News = require('../models/News');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new News({
    source: payload.source,
    link: payload.link,
    content: payload.content,
    title: payload.title,
  });
}

module.exports = {
  createFromPayload,
};
