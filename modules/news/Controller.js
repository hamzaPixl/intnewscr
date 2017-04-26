const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const NewsItem = require('./models/NewsItem');
const TraficItem = require('./models/TraficItem');
const TraficMapItem = require('./models/MapItem');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repositoryNews = new Repository(NewsItem);
  this.repositoryTrafic = new Repository(TraficItem);
}

Controller.prototype = {

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * It gives news only if parameters are correctly sets
   * @return Promise that contains data
   */
  getNews: function getNews (params) {
    if (!params || !params.source) {
      return null;
    }
    const news = this.repositoryNews.findAllBy('source', params.source + (params.language || ''));
    if (this.repositoryNews.resultIsValid(news)) {
      return new Promise((resolve, reject) => {
        if (!news) {
          reject(news);
        }
        resolve(news);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getNews(params).then((newsBuis) => {
        if (!newsBuis) {
          reject(newsBuis);
        }
        this.repositoryNews.saveAll(newsBuis);
        resolve(this.repositoryNews.findAllBy('source', params.source + (params.language || '')));
      }).catch((err) => {reject(err);});
    });
  },

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * It gives news only if parameters are correctly sets
   * It gives news from an API
   * @return Promise that contains data
   */
  getNewsApi: function getNews (params) {
    if (!params || !params.source) {
      return null;
    }
    const news = this.repositoryNews.findAllBy('source', params.source);
    if (this.repositoryNews.resultIsValid(news)) {
      return new Promise((resolve, reject) => {
        if (!news) {
          reject(news);
        }
        resolve(news);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getNewsApi(params).then((newsBuis) => {
        if (!newsBuis) {
          reject(news);
        }
        this.repositoryNews.saveAll(newsBuis);
        resolve(this.repositoryNews.findAllBy('source', params.source));
      }).catch((err) => {reject(err);});
    });
  },

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * It gives news only if parameters are correctly sets
   * It gives trafic informations
   * @return Promise that contains data
   */
  getNewsTrafic: function getNewsTrafic () {
    const trafic = this.repositoryTrafic.findAllBy('model', TraficItem.getName());
    if (this.repositoryTrafic.resultIsValid(trafic)) {
      return new Promise((resolve, reject) => {
        if (!trafic) {
          reject(trafic);
        }
        resolve({
          trafic,
          brussels: TraficMapItem.getBrussels(),
          vlaams: TraficMapItem.getVlaams(),
        });
      });
    }

    return new Promise((resolve, reject) => {
      this.buisness.getNewsTrafic().then((traficBuis) => {
        if (!traficBuis) {
          reject(traficBuis);
        }
        this.repositoryTrafic.saveAll(traficBuis);
        resolve({
          trafic: this.repositoryTrafic.findAllBy('model', TraficItem.getName()),
          brussels: TraficMapItem.getBrussels(),
          vlaams: TraficMapItem.getVlaams()
        });
      }).catch((err) => {reject(err);});
    });
  },

};

module.exports = Controller;
