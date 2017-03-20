const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const FacebookItem = require('./models/FacebookItem');


function Controller(config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repository = new Repository(FacebookItem);
}

Controller.prototype = {

    /**
     * Call the buisness if there are no data in database
     * else it return the data that the databse contains
     * @return Promis that contains data
     */
  getFacebookPosts: function getFacebookPosts(params) {
    const posts = this.repository.findAllBy('source', this.config[params.source]);
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
        this.repository.saveAll(postsBuis);
        resolve(this.repository.findAllBy('source', this.config[params.source]));
      });
    });
  },
};

module.exports = Controller;
