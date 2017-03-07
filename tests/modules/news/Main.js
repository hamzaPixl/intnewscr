const chai = require('chai');
const expect = chai.expect;


// dependencies needed for our tests
var Main = require('./../../../modules/news/Main');

describe('Main::getRoute', function() {

    it('getRoute() should return null because the route doesnt exists', function() {
        var main = new Main();
        expect(main.getRoute(65)).to.equal(null);
    });

    it('getRoute() should return null because the route doesnt exists', function() {
        var main = new Main();
        expect(main.getRoute('ghj_fsk sh')).to.equal(null);
    });

    it('getRoute() should return the route configuration', function() {
        var main = new Main();
        expect(main.getRoute('/trafic').callback).to.equal('getNewsTrafic');
        expect(main.getRoute('/trafic').method).to.equal('GET');

    });
});