function Main() {
  this.routes = {
    '/facebook': {
      method: 'GET',
      callback: 'getFacebookPosts',
      query: {
        source: 'string',
      },
    },
    '/google': {
      method: 'GET',
      callback: 'getGooglePosts',
      query: {
        source: 'string',
      },
    }
  };
}

Main.prototype = {

    /**
     * Get a route from the url
     * null if it is not defined
     * @param url is the url needed
     */
  getRoute: function getRoute(url) {
    if (!this.routes[url]) {
      return null;
    }
    return this.routes[url];
  },
};

module.exports = Main;
