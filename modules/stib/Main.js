function Main () {
  this.routes = {
    '/line': {
      method: 'GET',
      callback: 'getLine',
      query: {
        line: 'number',
      },
    },
  };
}

Main.prototype = {
  /**
   * Get a route from the url
   * null if it is not defined
   * @param url
   * @returns {*}
   */
  getRoute: function getRoute (url) {
    if (!this.routes[url]) {
      return null;
    }
    return this.routes[url];
  },
};

module.exports = Main;
