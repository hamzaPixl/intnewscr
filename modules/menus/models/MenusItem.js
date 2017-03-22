function MenusItem () {
  // properties of a specific instance
  this.id = '';
  this.created = '';
  this.ttl = '';
  this.model = '';
  this.source = '';
}

/**
 * @private
 * @return the name of the model item
 */
MenusItem.getName = function getName () {
  return 'menus';
};

/**
 * @private
 * @return the ttl of the data
 */
MenusItem.getTTL = function getTTL () {
  return 14400;
};

MenusItem.prototype = {

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson: function toJson () {
    return JSON.stringify({
      id: this.id,
      created: this.created,
      ttl: this.ttl,
      model: this.model,
      source: this.source,
      suggestion: this.suggestion,
      soupe: this.soupe,
    });
  },

  /**
   * It convert the json data on a MenusItem format
   * @param data come from database
   */
  fromData: function fromData (data) {
    this.id = data.id;
    this.created = data.created;
    this.ttl = data.ttl;
    this.model = data.model;
    this.suggestion = data.suggestion;
    this.soupe = data.soupe;
    this.source = data.source;
  },

  /**
   * It convert the json on a MenuItem format
   * @param json is the object that it will be converted
   */
  fromJson: function fromJson (json) {
    this.created = Date.now();
    this.model = MenusItem.getName();
    this.ttl = MenusItem.getTTL();
    if (json.jour) {
      this.id = json.jour;
      this.source = 'barasoupe';
      this.suggestion = json.suggestion;
      this.soupe = json.soupe;
    } else {
      this.source = 'gustine';
      this.suggestion = json.message;
      this.id = json.id;
      this.soupe = '';
    }
  },

};

module.exports = MenusItem;
