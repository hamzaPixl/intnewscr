const chai = require('chai');
const expect = chai.expect;

// dependencies needed for our tests
var Repository = require('./../../../core/models/Repository');



describe('Repository::read', function() {

    it('read() should return the content file', function() {
        var model = {
            getName: function getName() {
                return 'test';
            }
        }
        var repo = new Repository(model, './tests/database/');
        var data = repo.read();
        expect(data[0].value).to.equal('bar');
    });

    it('read() should return the content file', function() {
        var model = {
            getName: function getName() {
                return 'oklm';
            }
        }
        var repo = new Repository(model, './tests/database/');
        expect(repo.read()).to.equal(null);
    });

});

describe('Repository::findAll', function() {

    it('findAll() should return the parsed content of our file', function() {
        var model = function() {};
        model.getName = function getName() {
            return 'test';
        }
        model.prototype = {
            fromJson: function fromJson(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            fromData: function fromData(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            getFoo: function getFoo() {
                return this.foo;
            }
        };
        var repo = new Repository(model, './tests/database/');
        var data = repo.findAll();
        expect(data.length).to.equal(4);
        expect(data[0] instanceof model).to.equal(true);
        expect(data[1] instanceof model).to.equal(true);
        expect(data[0].value).to.equal('bar');
        expect(data[1].value).to.equal('bar2');
    });

});

describe('Repository::findAllBy', function() {

    it('findAllBy() should return the parsed content of our file', function() {
        var model = function() {};
        model.getName = function getName() {
            return 'test';
        }
        model.prototype = {
            fromJson: function fromJson(rawData) {
                this.id = rawData.id;
                this.value = rawData.value;
            },
            fromData: function fromData(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            getFoo: function getFoo() {
                return this.foo;
            }
        };
        var repo = new Repository(model, './tests/database/');
        var data = repo.findAllBy('id', 'foo1');
        expect(data.length).to.equal(1)
        expect(data[0] instanceof model).to.equal(true);
        expect(data[0].id).to.equal('foo1');
    });

    it('findAllBy() should return empty array if no models are found', function() {
        var model = function() {};
        model.getName = function getName() {
            return 'test';
        }
        model.prototype = {
            fromJson: function fromJson(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            fromData: function fromData(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            getFoo: function getFoo() {
                return this.foo;
            }
        };
        var repo = new Repository(model, './tests/database/');
        var data = repo.findAllBy('bar', 'something that does not exist');
        expect(data.length).to.equal(0);
    });

    it('findAllBy() should return empty array if no models are found', function() {
        var model = function() {};
        model.getName = function getName() {
            return 'test';
        }
        model.prototype = {
            fromJson: function fromJson(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            fromData: function fromData(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            getFoo: function getFoo() {
                return this.foo;
            }
        };
        var repo = new Repository(model, './tests/database/');
        var data = repo.findAllBy('this_does_not_exist', 'something that does not exist');
        expect(data.length).to.equal(0);
    });

});



describe('Repository::saveAll', function() {

    it('saveAll() should save the new items', function() {
        var model = function() {};
        model.getName = function getName() {
            return 'test';
        }
        model.prototype = {
            fromJson: function fromJson(rawData) {
                this.id = rawData.id;
                this.value = rawData.value;
            },
            fromData: function fromData(rawData) {
                this.value = rawData.value;
                this.id = rawData.id;
            },
            toJson: function toJson() {
                return JSON.stringify(this);
            },
            getFoo: function getFoo() {
                return this.foo;
            }
        };
        var repo = new Repository(model, './tests/database/');
        var array = [{

                "value": "bar5",
                "id": "foo3"

            },
            {

                "value": "bar6",
                "id": "foo4"

            }
        ];
        repo.saveAll(array);
        var data = repo.findAll();
        expect(data.length).to.equal(4);
        expect(data[0] instanceof model).to.equal(true);
        expect(data[2].value).to.equal('bar5');
        expect(data[3].value).to.equal('bar6');
    });


});