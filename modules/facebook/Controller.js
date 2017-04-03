const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const TokenItem = require('./models/TokenItem');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repository = new Repository(TokenItem);
}

Controller.prototype = {

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * @return Promise that contains data
   */
  getToken: function getToken () {
    const token = this.repository.findAll();
    if (token && token.length > 0) {
      return new Promise((resolve, reject) => {
        if (!token) {
          reject(token);
        }
        resolve(token);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getToken().then((tokenBuis) => {
        if (!tokenBuis) {
          reject(tokenBuis);
        }
        this.repository.saveAll(tokenBuis);
        resolve(this.repository.findAll());
      }).catch((err) => {reject(err);});
    });
  },
};

module.exports = Controller;
