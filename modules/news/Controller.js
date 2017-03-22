const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const NewsItem = require('./models/NewsItem');
const TraficItem = require('./models/TraficItem');
const TraficMapItem = require('./models/MapItem');


function Controller(config, services) {
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
  * @return Promis that contains data
  */
  getNews: function getNews(params) {
    if (!params || !params.source) {
      return null;
    }
    const news = this.repositoryNews.findAllBy('source', params.source + (params.language || ''));
    if (news && news.length > 0) {
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
      });
    });
  },

  /**
  * Call the buisness if there are no data in database
  * else it return the data that the databse contains
  * It gives news only if parameters are correctly sets
  * It gives news from an API
  * @return Promis that contains data
  */
  getNewsApi: function getNews(params) {
    if (!params || !params.source) {
      return null;
    }
    const news = this.repositoryNews.findAllBy('source', params.source);
    if (news && news.length > 0) {
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
      });
    });
  },

  /**
  * Call the buisness if there are no data in database
  * else it return the data that the databse contains
  * It gives news only if parameters are correctly sets
  * It gives trafic informations
  * @return Promis that contains data
  */
  getNewsTrafic: function getNewsTrafic() {
    const trafic = this.repositoryTrafic.findAllBy('model', TraficItem.getName());
    if (trafic && trafic.length > 0) {
      return new Promise((resolve, reject) => {
        if (!trafic) {
          reject(trafic);
        }
        resolve(trafic);
      });
    }

    return new Promise((resolve, reject) => {
      this.buisness.getNewsTrafic().then((traficBuis) => {
        if (!traficBuis) {
          reject(traficBuis);
        }
        this.repositoryTrafic.saveAll(traficBuis);
        resolve(this.repositoryTrafic.findAllBy('model', TraficItem.getName()));
      });
    });
  },

  /**
  * It gives the traffic map from a source
  * @return Promis that contains data
  */
  getNewsTraficMaps: function getNewsTraficMaps(params) {
    return new Promise((resolve, reject) => {
      if (params.source === 'brussels') {
        resolve(TraficMapItem.getBrussels());
      } else if (params.source === 'vlaams') {
        resolve(TraficMapItem.getVlaams());
      } else {
        reject(null);
      }
    });
  },
};

module.exports = Controller;
