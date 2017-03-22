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
   * else it return the data that the databse contains
   * @return Promis that contains data
   */
  getFacebookPosts: function getFacebookPosts (params) {
    const posts = this.repoFacebook.findAllBy('source', this.config[params.source]);
    if (posts && posts.length > 0) {
      return new Promise((resolve, reject) => {
        if (!posts) {
          reject(posts);
        }
        resolve(posts);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getFacebookPosts(this.config[params.source]).then((postsBuis) => {
        if (!postsBuis) {
          reject(postsBuis);
        }
        this.repoFacebook.saveAll(postsBuis);
        resolve(this.repoFacebook.findAllBy('source', this.config[params.source]));
      });
    });
  },

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * @return Promis that contains data
   */
  getGooglePosts: function getGooglePosts (params) {
    const posts = this.repoGoogle.findAllBy('source', params.source);
    if (posts && posts.length > 0) {
      return new Promise((resolve, reject) => {
        if (!posts) {
          reject(posts);
        }
        resolve(posts);
      });
    }
    return new Promise((resolve, reject) => {
      this.buisness.getGooglePosts(params.source).then((postsBuis) => {
        if (!postsBuis) {
          reject(postsBuis);
        }
        this.repoGoogle.saveAll(postsBuis);
        resolve(this.repoGoogle.findAllBy('source', params.source));
      });
    });
  },
};

module.exports = Controller;
