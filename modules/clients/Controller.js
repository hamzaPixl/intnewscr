const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const FacebookItem = require('./models/FacebookItem');
const GoogleItem = require('./models/GoogleItem');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repoFacebook = new Repository(FacebookItem);
  this.repoGoogle = new Repository(GoogleItem);
}

Controller.prototype = {

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the database contains
   * @return Promise that contains data
   */
  getFacebookPosts: function getFacebookPosts (params) {
    const posts = this.repoFacebook.findAllBy('source', this.config[params.source]);
    if (this.repoFacebook.resultIsValid(posts)) {
      return new Promise((resolve, reject) => {
        if (!posts) {
          reject(posts);
        }
        resolve({posts, source: params.source});
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getFacebookPosts(this.config[params.source]).then((postsBuis) => {
        if (!postsBuis) {
          reject(postsBuis);
        }
        this.repoFacebook.saveAll(postsBuis);
        resolve({posts: this.repoFacebook.findAllBy('source', this.config[params.source]), source: params.source});
      }).catch((err) => {reject(err);});
    });
  },

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * @return Promise that contains data
   */
  getGooglePosts: function getGooglePosts (params) {
    const posts = this.repoGoogle.findAllBy('source', params.source);
    if (this.repoGoogle.resultIsValid(posts)) {
      return new Promise((resolve, reject) => {
        if (!posts) {
          reject(posts);
        }
        resolve({posts, source: params.source});
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getGooglePosts(params.source).then((postsBuis) => {
        if (!postsBuis) {
          reject(postsBuis);
        }
        this.repoGoogle.saveAll(postsBuis);
        resolve({posts: this.repoGoogle.findAllBy('source', params.source), source: params.source});
      }).catch((err) => {reject(err);});
    });
  },


};

module.exports = Controller;
