const gravatar = require('gravatar');

const mapOne = ({
  id,
  firstName,
  lastName,
  email,
  role,
}) => ({
  id,
  firstName,
  lastName,
  email,
  role,
  avatar: gravatar.url(email, { s: '200', r: 'pg', d: '404' }),
});

const map = (users = []) => users.map(mapOne);

module.exports = {
  map,
  mapOne,
};
