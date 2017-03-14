function Main() {
  this.routes = {
    '/trafic': {
      method: 'GET',
      callback: 'getNewsTrafic',
    },
    '/news': {
      method: 'GET',
      callback: 'getNews',
      query: {
        source: 'string',
        language: 'string',
      },
    },
    '/newsapi': {
      method: 'GET',
      callback: 'getNewsApi',
      query: {
        source: 'string',
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
