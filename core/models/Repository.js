var fs = require("fs");

function Repository(model, databasePath) {
    this.model = model;
    this.databasePath = databasePath || './database/';
    this.items;
}

Repository.prototype = {

    /**
     * returns the content of the json file
     * 
     * @return null if nothing 
     * @return {[NewsItem]} array of result
     */
    findAll: function findAll() {
        if (!this.items) {
            var data = this.read();
            if (data) {
                this.items = data.map(function(rawItemData) {
                    var item = new this.model;
                    item.fromJson(rawItemData);
                    return item;
                }.bind(this));
            }
        }
        return this.items;
    },

    /**
     * returns the content of the json file
     * give the result by filtring them
     * 
     * repository.findAllBy('languge', 'fr');
     * 
     * @return null if nothing 
     * @return {{*}} array of result
     */
    findAllBy: function findAllBy(key, value) {
        return this.findAll().filter(function(newsItem) {
            return newsItem[key] === value;
        });
    },

    /**
     * save the item in a file 
     * 
     * @private
     *
     **/
    update: function update(item) {
        if (!this.items) {
            this.findAll();
        }
        this.items = this.items.map(function(itemTemp) {
            if (item.id === itemTemp.id) {
                itemTemp = item;
            }
            return itemTemp;
        });
    },

    /**
     * save the items in a file 
     * 
     * @see Repository::save
     *
     **/
    saveAll: function saveAll(items) {
        items.forEach(function(itemData) {
            if (!(itemData instanceof this.model)) {
                var item = new this.model();
                item.fromJson(itemData);
            }
            this.update(item);
        }.bind(this));
        this.write();
    },

    /**
     * write on file
     * @private
     */
    write: function write() {
        fs.writeFileSync(
            this.databasePath + this.model.getName() + '.json',
            '[' + this.items.map(function(item) { return item.toJson() }).join(',') + ']'
        );
    },

    /**
     * read the file
     * @private
     */
    read: function read() {
        try {
            return JSON.parse(fs.readFileSync(this.databasePath + this.model.getName() + '.json'));
        } catch (err) {
            return null;
        }

    }

};

module.exports = Repository;