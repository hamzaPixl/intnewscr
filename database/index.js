const promise = require('bluebird');

const pgOptions = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(pgOptions);


class ConnectPostgres {
  constructor() {
    this.instance = null;
    if (!this.instance) {
      this.instance = this;
    }
  }

  /**
   * Connection to pg promise
   * @param {any} connection
   * @param {any} userPwd
   * @memberof ConnectPostgres
   */
  connect(connection, userPwd) {
    this.options = Object.assign(connection, userPwd);
    this.connection = pgp(this.options);
  }
}

module.exports = new ConnectPostgres();
