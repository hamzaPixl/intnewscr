function Request() {
  this.method = 'GET';
  this.baseUrl = '';
  this.path = '';
  this.params = {};
  this.name = '';
}

Request.prototype = {
  param: function param(str) {
    return this.params[str];
  },
  addParam: function addParam(key, value) {
    this.params[key] = value;
    return this;
  },
  setpath: function setpath(value) {
    this.path = value;
    return this;
  },
  setbaseUrl: function setbaseUrl(value) {
    this.baseUrl = value;
    return this;
  },
  build: function build() {
    return this;
  },

};

module.exports = Request;
