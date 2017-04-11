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
    '/getAuthServices': {
      method: 'GET',
      callback: 'getAuthServices',
      secured: true,
    },
    '/getAll': {
      method: 'GET',
      callback: 'getAll',
      secured: true,
    },
    '/getToken': {
      method: 'GET',
      callback: 'getToken',
      secured: true,
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
    '/deleteWidget': {
      method: 'GET',
      callback: 'deleteWidget',
      secured: true,
      query: {
        request: 'object',
      },
    },
    '/createWidget': {
      method: 'GET',
      callback: 'createWidget',
      secured: true,
      query: {
        request: 'object',
      },
    },
    '/updateWidget': {
      method: 'GET',
      callback: 'updateWidget',
      secured: true,
      query: {
        request: 'object',
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
