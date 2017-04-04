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
      query: {
        user: 'string',
        password: 'string',
      },
    },
    '/setDefault': {
      method: 'GET',
      callback: 'setDefault',
      secured: true,
      query: {
        params: 'object',
        route: 'string',
      },
    },
    '/getRoutes': {
      method: 'GET',
      callback: 'getRoutes',
      secured: true,
      query: {
        module: 'string',
      },
    },
    '/getAllWidgets': {
      method: 'GET',
      callback: 'getAllWidgets',
      secured: true,
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
