function WeatherItem() {
    // properties of a specific instance
    this.id;
    this.created;
    this.ttl;
    this.model;
    this.date;
    this.max;
    this.min;
    this.precip;
    this.description;
    this.day;
}

WeatherItem.getName = function getName() {
    return 'weather';
}


WeatherItem.getTTL = function getTTL() {
    return 14400;
}

WeatherItem.prototype = {

    /**
     * It convert the the current object model
     * into a json.
     * 
     */
    toJson: function toJson() {
        return JSON.stringify({
            id: this.id,
            created: this.created,
            ttl: this.ttl,
            model: this.model,
            date: this.date,
            day: this.day,
            max: this.max,
            min: this.min,
            precip: this.precip,
            description: this.description
        });
    },

    /**
     * It convert the json data on a WeatherItem format
     * @data come from database
     * 
     */

    fromData: function fromData(data) {
        this.id = data.id;
        this.created = data.created;
        this.ttl = data.ttl;
        this.model = data.model;

        this.date = data.date;
        this.max = data.max;
        this.min = data.min;
        this.precip = data.precip;
        this.description = data.description;
        this.day = data.day;
    },

    /**
     * It convert the json on a WeatherItem format
     * @json is the object that it will be converted
     * 
     */
    fromJson: function fromJson(json) {
        this.created = Date.now();
        this.model = WeatherItem.getName();
        this.ttl = WeatherItem.getTTL();
        this.id = json.date;
        this.date = json.date;
        this.max = json.high;
        this.min = json.low;
        this.precip = json.precip;
        this.description = json.skytextday;
        this.day = json.day;
    }

};

module.exports = WeatherItem;