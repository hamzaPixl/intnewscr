const passport = require('passport');

function Controller (strategy) {
  this.Controller = require(`./../../modules/auth/${strategy}/Controller`);
  this.controller = new this.Controller();
  this.Strategy = this.controller.Strategy();
}

Controller.prototype = {

  /**
   * Set the midlware
   */
  initialize: function initialize () {
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
    passport.use(new this.Strategy(this.getCredentials(), this.getHandlerFunction()));
  },

  /**
   * Get the passport object
   * @return {Passport}
   */
  getPassport: function getPassport () {
    return passport;
  },

  /**
   * Return credentials to initialize strategy
   * @return {{clientID: *, clientSecret: *, callbackURL: *}}
   */
  getCredentials: function getCredentials () {
    return this.controller.getCredentials();
  },

  /**
   * This function will be executed when the accestoken is recieve
   * @return {function(*, *=, *, *)}
   */
  getHandlerFunction: function getHandlerFunction () {
    return this.controller.getHandlerFunction();
  },

  /**
   * Get the key for authenticate passport
   * @return {string}
   */
  getAuthenticateKey: function getAuthenticateKey () {
    return this.controller.getAuthenticateKey();
  },

  /**
   * Get the scope object for authenticate passport
   * @return {{scope: [string,string]}}
   */
  getAuthenticateScope: function getAuthenticateScope () {
    return this.controller.getAuthenticateScope();
  },

};

module.exports = Controller;
