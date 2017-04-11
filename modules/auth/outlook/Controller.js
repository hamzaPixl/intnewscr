const Buisness = require('./Buisness');
const Repository = require('./../../../core/models/Repository');
const TokenItem = require('./models/TokenItem');

function Controller () {
  this.buisness = new Buisness();
  this.repository = new Repository(TokenItem);
}

Controller.prototype = {

  /**
   * Return credentials to initialize strategy
   * @return {{clientID: *, clientSecret: *, callbackURL: *}}
   */
  getCredentials: function getCredentials () {
    return this.buisness.getCredentials();
  },

  /**
   * This function will be executed when the accestoken is recieve
   * @return {function(*, *=, *, *)}
   */
  getHandlerFunction: function getHandlerFunction () {
    return this.buisness.getHandlerFunction(this.repository);
  },

  /**
   * Get the key for authenticate passport
   * @return {string}
   */
  getAuthenticateKey: function getAuthenticateKey () {
    return this.buisness.getAuthenticateKey();
  },

  /**
   * Get the scope object for authenticate passport
   * @return {{scope: [string,string]}}
   */
  getAuthenticateScope: function getAuthenticateScope () {
    return this.buisness.getAuthenticateScope();
  },

  /**
   * Gives the strategy for passport use
   * @return {*}
   */
  Strategy: function Strategy () {
    return this.buisness.getStrategy();
  },
};

module.exports = Controller;
