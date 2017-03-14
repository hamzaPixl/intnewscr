function Main() {
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
  getRoute: function getRoute(url) {
    if (!this.routes[url]) {
      return null;
    }
    return this.routes[url];
  },
};

module.exports = Main;
