function Buisness () {
  this.Strategy = require('passport-outlook').Strategy;
  this.clientID = process.env.ID_APP_OUTLOOK;
  this.clientCALLBACK = process.env.CALLBACK_URI_OUTLOOK;
  this.clientSECRET = process.env.KEY_APP_OUTLOOK;
}

Buisness.prototype = {

  /**
   * Gives the strategy for passport use
   * @return {*}
   */
  getStrategy: function getStrategy () {
    return this.Strategy;
  },

  /**
   * Return credentials to initialize strategy
   * @return {{clientID: *, clientSecret: *, callbackURL: *}}
   */
  getCredentials: function getCredentials () {
    return {
      clientID: this.clientID,
      clientSecret: this.clientSECRET,
      callbackURL: this.clientCALLBACK
    };
  },

  /**
   * This function will be executed when the accestoken is recieve
   * @param repo
   * @return {function(*, *=, *, *)}
   */
  getHandlerFunction: function getHandlerFunction (repo) {
    return (accessToken, refreshToken, profile, done) => {
      const user = {
        outlookId: profile.id,
        name: profile.DisplayName,
        email: profile.EmailAddress,
        accessToken
      };
      if (refreshToken) {
        user.refreshToken = refreshToken;
      }
      if (profile.MailboxGuid) {
        user.mailboxGuid = profile.MailboxGuid;
      }
      if (profile.Alias) {
        user.alias = profile.Alias;
      }
      repo.saveAll([user]);
      return done(null, user);
    };
  },

  /**
   * Get the key for authenticate passport
   * @return {string}
   */
  getAuthenticateKey: function getAuthenticateKey () {
    return 'windowslive';
  },

  /**
   * Get the scope object for authenticate passport
   * @return {{scope: [string,string]}}
   */
  getAuthenticateScope: function getAuthenticateScope () {
    return {
      scope: [
        'openid',
        'https://outlook.office.com/mail.Read',
      ],
    };
  },
};

module.exports = Buisness;
