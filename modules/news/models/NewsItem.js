function NewsItem() {
    // properties of a specific instance
  this.language = '';
  this.id = null;
  this.title = '';
  this.link = '';
  this.date = '';
  this.content = '';
  this.source = '';
}

/**
 * @private
 * @return the name of the model item
 */
NewsItem.getName = function getName() {
  return 'news';
};

/**
 * @private
 * @return the name of the model item
 */
NewsItem.getTTL = function getTTL() {
  return 14400;
};

NewsItem.prototype = {

    /**
     * It convert the the current object model
     * into a json.
     */
  toJson: function toJson() {
    return JSON.stringify({
      content: this.content,
      id: this.id,
      created: this.created,
      title: this.title,
      date: this.date,
      link: this.link,
      ttl: NewsItem.getTTL(),
      model: NewsItem.getName(),
      language: this.language,
      source: this.source,
    });
  },

    /**
     * It convert the json data on a NewsItem format
     * @data come from database
     */

  fromData: function fromData(data) {
    this.created = data.created;
    this.id = data.id;
    this.content = data.content;
    this.title = data.title;
    this.date = data.date;
    this.link = data.link;
    this.language = data.language;
    this.source = data.source;
    this.model = data.model;
  },

    /**
     * It convert the json on a NewsItem format
     * @json is the object that it will be converted
     */
  fromJson: function fromJson(json) {
    this.created = Date.now();
    this.model = NewsItem.getName();
    if (json.url) {
      this.id = json.url;
      this.content = json.description;
      this.title = json.title;
      this.date = json.publishedAt;
      this.link = json.url;
      this.language = 'en';
      this.source = 'techcrunch';
    } else if (json.guid.includes('www.rtl.be')) {
      this.content = json.contentSnippet;
      this.id = json.guid;
      this.title = json.title;
      this.date = json.pubDate;
      this.link = json.guid;
      this.language = 'fr';
      this.source = `bel${this.language}`;
    } else {
      this.content = json.contentSnippet;
      this.title = json.title;
      this.id = json.guid;
      this.date = json.pubDate;
      this.link = json.link;
      this.language = 'nl';
      this.source = `bel${this.language}`;
    }
  },

};

module.exports = NewsItem;
