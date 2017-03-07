function Main() {
    this.routes = {
        '/bar': {
            method: 'GET',
            callback: 'bar',
        }
    };
}

Main.prototype = {

    getRoute: function getRoute(url) {
        if (!this.routes[url])
            return null;
        return this.routes[url];
    }

};

module.exports = Main;