class Main {

  constructor() {
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
      '/getAllView': {
        method: 'GET',
        callback: 'getAllView',
        secured: true,
      },
      '/deleteView': {
        method: 'GET',
        callback: 'deleteView',
        secured: true,
        query: {
          view: 'object',
        },
      },
      '/createView': {
        method: 'GET',
        callback: 'createView',
        secured: true,
        query: {
          view: 'object',
        },
      },
      '/updateView': {
        method: 'GET',
        callback: 'updateView',
        secured: true,
        query: {
          view: 'object',
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
          widget: 'object',
        },
      },
      '/createWidget': {
        method: 'GET',
        callback: 'createWidget',
        secured: true,
        query: {
          widget: 'object',
        },
      },
      '/updateWidget': {
        method: 'GET',
        callback: 'updateWidget',
        secured: true,
        query: {
          widget: 'object',
        },
      },
    };
  }

  /**
   * Get a route from the url
   * null if it is not defined
   * @param url
   * @returns {*}
   */
  getRoute(url) {
    if (!this.routes[url]) {
      return null;
    }
    return this.routes[url];
  }
}

module.exports = Main;
