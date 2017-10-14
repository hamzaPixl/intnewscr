
class Request {

  constructor(baseUrl, path, params) {
    this.method = 'GET';
    this.baseUrl = baseUrl;
    this.path = path;
    this.params = params;
  }

  /**
   * It gives the parametre value from a key
   * @param str is the parametre key
   * @return value of parameter
   */
  param(str) {
    return this.params[str];
  }

}

module.exports = Request;
