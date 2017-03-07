const chai = require('chai');
const expect = chai.expect;


// dependencies needed for our tests
var NewsItem = require('./../../../modules/news/models/NewsItem');
var TraficItem = require('./../../../modules/news/models/TraficItem');


describe('NewsItem::getName', function() {

    it('getName() should return null because the route doesnt exists', function() {
        var main = new NewsItem();
        expect(NewsItem.getName()).to.equal('news');
    });

});

describe('TraficItem::getName', function() {

    it('getName() should return null because the route doesnt exists', function() {
        var main = new TraficItem();
        expect(TraficItem.getName()).to.equal('trafic');
    });

});



describe('NewsItem::getTTL', function() {

    it('getTTL() should return null because the route doesnt exists', function() {
        var main = new NewsItem();
        expect(NewsItem.getTTL()).to.equal(14400);
    });

});

describe('TraficItem::getTTL', function() {

    it('getTTL() should return null because the route doesnt exists', function() {
        var main = new TraficItem();
        expect(TraficItem.getTTL()).to.equal(14400);
    });

});


describe('TraficItem::fromJson', function() {

    it('fromJson() should return null because the route doesnt exists', function() {
        var main = new TraficItem();
        var ob = {
            content: "hpovore",
            title: "mocktitle",
            pubDate: "6fsdfh754",
            link: "mockliink"
        }
        main.fromJson(ob);
        expect(main.content).to.equal("hpovore");
    });

});