class Main {
  constructor() {
    this.routes = {
      '/weather': {
        method: 'GET',
        callback: 'getWeather',
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
