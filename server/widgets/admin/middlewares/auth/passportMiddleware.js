const config = require('config');
const passport = require('passport');
const { Strategy } = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const errors = require('../../../../domain/models/errors');
const { userRepository } = require('../../domain/repositories');

const loginOptions = { usernameField: 'email', passwordField: 'password' };
const jwtOptions = { secretOrKey: config.secret, jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() };

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await userRepository.findOneId(id);
  return done(null, user);
});

passport.use('login', new Strategy(loginOptions, async (email, password, done) => {
  const user = await userRepository.findOne(email);
  if (!user) {
    return done(new errors.AuthenticationError('User was not found !'));
  }

  const validate = await user.isValidPassword(password);
  if (!validate) {
    return done(new errors.AuthenticationError('User has bad credentials !'));
  }

  return done(null, user, { message: 'Logged in Successfully' });
}));

passport.use('jwt', new JWTstrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userRepository.findOne(payload.email);
    if (!user) {
      return done(new errors.AuthenticationError('User was not found !'));
    }
    return done(null, user);
  } catch (error) {
    throw done(new errors.AuthenticationError('JWT malformed !'));
  }
}));
