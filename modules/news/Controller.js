const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const NewsItem = require('./models/NewsItem');
const TraficItem = require('./models/TraficItem');


function Controller(moduleLocator, config, services) {
    this.config = config;
    this.services = services;
    this.moduleLocator = moduleLocator;
    this.buisness = new Buisness(this.services, this.config);
    this.repositoryNews = new Repository(NewsItem);
    this.repositoryTrafic = new Repository(TraficItem);
}

Controller.prototype = {

    getNews: function getNews(params) {

        if (!params || !params.source) {
            return null;
        }

        var news = this.repositoryNews.findAllBy('source', params.source + (params.language || ''));
        if (news && news.length > 0) {
            return new Promise(function(resolve, reject) {
                resolve(news);
            });
        }

        return new Promise(function(resolve, reject) {
            this.buisness.getNews(params).then(function(news) {
                this.repositoryNews.saveAll(news);
                resolve(this.repositoryNews.findAllBy('source', params.source + (params.language || '')));
            }.bind(this));
        }.bind(this));


    },

    getNewsApi: function getNews(params) {

        if (!params || !params.source) {
            return null;
        }

        var news = this.repositoryNews.findAllBy('source', params.source);
        if (news && news.length > 0) {
            return new Promise(function(resolve, reject) {
                resolve(news);
            });
        }

        return new Promise(function(resolve, reject) {
            this.buisness.getNewsApi(params).then(function(news) {
                this.repositoryNews.saveAll(news);
                resolve(this.repositoryNews.findAllBy('source', params.source));
            }.bind(this));
        }.bind(this));


    },

    getNewsTrafic: function getNewsTrafic() {
        var trafic = this.repositoryTrafic.findAllBy('model', TraficItem.getName());
        if (trafic && trafic.length > 0) {
            return new Promise(function(resolve, reject) {
                resolve(trafic);
            });
        }

        return new Promise(function(resolve, reject) {
            this.buisness.getNewsTrafic().then(function(trafic) {
                this.repositoryTrafic.saveAll(trafic);
                resolve(this.repositoryTrafic.findAllBy('model', TraficItem.getName()));
            }.bind(this));
        }.bind(this));
    },


};

module.exports = Controller;