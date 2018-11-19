const config = require('config');
const passport = require('passport');
const { Strategy } = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const errors = require('../../../../domain/models/errors');
const { userRepository } = require('../../domain/repositories');

const loginOptions = { usernameField: 'email', passwordField: 'password' };
const jwtOptions = { secretOrKey: config.secret, jwtFromRequest: ExtractJWT.fromUrlQueryParameter(config.secret) };

passport.use('login', new Strategy(loginOptions, async (email, password, done) => {
  const user = await userRepository.findOne(email);
  if (!user) {
    throw new errors.NotFoundError('User was not found !');
  }

  const validate = await user.isValidPassword(password);
  if (!validate) {
    throw new errors.AuthenticationError('User has bad credentials !');
  }

  return done(null, user, { message: 'Logged in Successfully' });
}));

passport.use('jwt', new JWTstrategy(jwtOptions, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    throw new errors.AuthenticationError('JWT malformed !');
  }
}));
