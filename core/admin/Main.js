function Main () {
  this.routes = {
    '/connexion': {
      method: 'GET',
      callback: 'connexion',
      query: {
        user: 'string',
        password: 'string',
      },
    },
    '/getAll': {
      method: 'GET',
      callback: 'getAll',
      secured: true,
    },
    '/getRoutes': {
      method: 'GET',
      callback: 'getRoutes',
      secured: true,
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
