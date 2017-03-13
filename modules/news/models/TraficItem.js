function TraficItem() {
    // properties of a specific instance
    this.id = null;
    this.title = '';
    this.link = '';
    this.date = '';
    this.content = '';
    this.source = '';
}

/**
 * @private
 * 
 * @return the name of the model item
 */
TraficItem.getName = function getName() {
    return 'trafic';
}


/**
 * @private
 * 
 * @return the name of the model item
 */
TraficItem.getTTL = function getTTL() {
    return 14400;
}

TraficItem.prototype = {

    /**
     * It convert the the current object model
     * into a json.
     * 
     */
    toJson: function toJson() {
        return JSON.stringify({
            created: this.created,
            content: this.content,
            title: this.title,
            id: this.link,
            date: this.date,
            link: this.link,
            source: this.source,
            ttl: TraficItem.getTTL(),
            model: TraficItem.getName()
        });
    },

    /**
     * It convert the json data on a TraficItem format
     * @data come from database
     * 
     */

    fromData: function fromData(data) {
        this.created = data.created;
        this.content = data.content;
        this.title = data.title;
        this.id = data.id;
        this.date = data.date;
        this.link = data.link;
        this.source = data.source;
        this.model = data.model;
    },

    /**
     * It convert the json on a TraficItem format
     * @json is the object that it will be converted
     * 
     */
    fromJson: function fromJson(json) {
        this.created = Date.now();
        this.content = json.content;
        this.title = json.title;
        this.id = json.link;
        this.date = json.pubDate;
        this.link = json.link;
        this.source = 'Trafiroutes';
        this.model = TraficItem.getName();
    }

};

module.exports = TraficItem;