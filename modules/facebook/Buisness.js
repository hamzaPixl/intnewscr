function Buisness(services, config) {
  this.services = services;
  this.config = config;
  this.user_code = '';
  this.verify_code = '';
  this.interval = null;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {

  /**
     * A request is send to retrieve the user code
     * if there is no error we set the user code and the code to check
     * @private
     */
  getUserCode: function getUserCode() {
    return new Promise((resolve, reject) => {
      this.request.post({ url: 'https://graph.facebook.com/v2.6/device/login',
        form: { access_token: `${this.config.clientid}|${this.config.clienttoken}` } }, (err, httpResponse, body) => {
        const result = JSON.parse(body);
        if (!err && !result.error) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  },

  /**
     * A request is send to retrieve the login status
     * if there is no error we set our acces_token
     * this call is send every 5 s until the user enter his code
     * @private
     */
  statusLoginOk: function statusLoginOk() {
    return new Promise((resolve, reject) => {
      this.request.post({ url: 'https://graph.facebook.com/v2.6/device/login_status',
        form: { access_token: `${this.config.clientid}|${this.config.clienttoken}`, code: this.verify_code } }, (err, httpResponse, body) => {
        const result = JSON.parse(body);
        if (!err && !result.error) {
          const array = [result];
          resolve(array);
        } else {
          reject(result);
        }
      });
    });
  },
  /**
     * It will search a token from facebook
     * @see Buisness::statusLoginOk
     * @see Buisness::getUserCode
     * @return Promise with data
     */
  getToken: function getToken() {
    return new Promise((resolve, reject) => {
      this.getUserCode().then((result) => {
        this.user_code = result.user_code;
        this.verify_code = result.code;
        console.log(this.user_code);
        this.interval = setInterval(() => {
          this.statusLoginOk().then((accesToken) => {
            clearInterval(this.interval);
            resolve(accesToken);
          }, (error) => {
            if (error.error.code !== 31) {
              clearInterval(this.interval);
              reject(error);
            }
          });
        }, 5000);
      }, (error) => {
        reject(error);
      });
    });
  },
};

module.exports = Buisness;
