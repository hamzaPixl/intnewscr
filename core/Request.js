/**
* This is the Request object that is used
* in the project, by the back and frontend
* this object match to the express one.
*/
function Request(baseUrl, path, params) {
  this.method = 'GET';
  this.baseUrl = baseUrl;
  this.path = path;
  this.params = params;
}

Request.prototype = {
  /**
  * It gives the parametre value from a key
  * @param str is the parametre key
  * @return value of parameter
  */
  param: function param(str) {
    return this.params[str];
  },

};

module.exports = Request;
