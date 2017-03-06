function Model() {
    this.path = './database/bar/';
    this.name = 'bar';
    this.ttl = 14400;
    this.config = {
        "foo": 'bar.json'
    };
}

Model.prototype = {

    getPath: function getPath() {
        return this.path;
    },

    getName: function getName() {
        return this.name;
    },

    getTTL: function getTTL() {
        return this.ttl;
    },

    getConfig: function getConfig() {
        return this.config;
    },

    convertData: function convertData(array) {

    }

};

module.exports = Model;