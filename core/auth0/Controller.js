const passport = require('passport');

class Controller {

  constructor(strategy) {
    this.Controller = require(`./../../modules/auth/${strategy}/Controller`);
    this.controller = new this.Controller();
    this.Strategy = this.controller.Strategy();
  }

  /**
   * Set the midlware
   */
  initialize() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
    passport.use(new this.Strategy(this.getCredentials(), this.getHandlerFunction()));
  }

  /**
   * Get the passport object
   * @return {Passport}
   */
  getPassport() {
    return passport;
  }

  /**
   * Return credentials to initialize strategy
   * @return {{clientID: *, clientSecret: *, callbackURL: *}}
   */
  getCredentials() {
    return this.controller.getCredentials();
  }

  /**
   * This function will be executed when the accestoken is recieve
   * @return {function(*, *=, *, *)}
   */
  getHandlerFunction() {
    return this.controller.getHandlerFunction();
  }

  /**
   * Get the key for authenticate passport
   * @return {string}
   */
  getAuthenticateKey() {
    return this.controller.getAuthenticateKey();
  }

  /**
   * Get the scope object for authenticate passport
   * @return {{scope: [string,string]}}
   */
  getAuthenticateScope() {
    return this.controller.getAuthenticateScope();
  }

}

module.exports = Controller;
