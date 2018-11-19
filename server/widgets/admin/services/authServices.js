const jwt = require('../../../tools/jwt');

async function login(user) {
  return jwt.sign({ role: user.role, email: user.email });
}

module.exports = {
  login,
};
