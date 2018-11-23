const config = require('config');
const jwt = require('jsonwebtoken');

function sign(payload) {
  return jwt.sign(payload, config.secret);
}

module.exports = {
  sign,
};
