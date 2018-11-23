const user = require('../../migrations/Users.json');

async function getProfil() {
  // STUB - Users services
  return Promise.resolve(user);
}

module.exports = {
  getProfil,
};
