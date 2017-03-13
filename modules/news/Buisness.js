function Buisness(services, config) {
    this.services = services;
    this.config = config;
    for (var key in this.services) {
        this[key] = require(this.services[key].name);
    }
}

Buisness.prototype = {
    getNews: function getNews(params) {
        if (params.language == 'fr') {
            return this.getNewsFr();
        } else if (params.language == 'nl') {
            return this.getNewsNl();
        }

    },
    getNewsFr: function getNewsFr() {
        return new Promise(function(resolve, reject) {
            this.rss.parseURL(this.config.url_fr, function(err, parsed) {
                if (err) {
                    reject(err);
                } else {
                    resolve(parsed.feed.entries.slice(0, 3));
                }
            });
        }.bind(this));
    },
    getNewsNl: function getNewsNl() {
        return new Promise(function(resolve, reject) {
            this.rss.parseURL(this.config.url_nl, function(err, parsed) {
                if (err) {
                    reject(err);
                } else {
                    resolve(parsed.feed.entries.slice(0, 3));
                }
            });
        }.bind(this));
    },
    getNewsApi: function getNewsApi(params) {
        var url = this.config.url_api.replace('sourceinput', params.source);
        return new Promise(function(resolve, reject) {
            this.request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let res = JSON.parse(body);
                    resolve(res.articles.slice(0, 3));
                }
            });
        }.bind(this));
    },
    getNewsTrafic: function getNewsTrafic() {
        return new Promise(function(resolve, reject) {
            this.rss.parseURL(this.config.url_trafic, function(err, parsed) {
                if (err) {
                    reject(err);
                } else {
                    resolve(parsed.feed.entries.slice(0, 6));
                }
            });
        }.bind(this));
    },

};

module.exports = Buisness;