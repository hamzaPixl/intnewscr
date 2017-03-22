function Main () {
  this.routes = {
    '/getAll': {
      method: 'GET',
      callback: 'getAll',
    },
    '/getRoutes': {
      method: 'GET',
      callback: 'getRoutes',
      query: {
        module: 'string',
      },
    },
  };
}

Main.prototype = {

  /**
   * Get a route from the url
   * null if it is not defined
   * @param url is the url needed
   */
  getRoute: function getRoute (url) {
    if (!this.routes[url]) {
      return null;
    }
    return this.routes[url];
  },
};

module.exports = Main;
