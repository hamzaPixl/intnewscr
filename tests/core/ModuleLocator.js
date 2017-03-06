const chai = require('chai');
const expect = chai.expect;

// dependencies needed for our tests
var ModuleLocator = require('./../../core/ModuleLocator');

var modulespath = './../tests/core/modules.json';
var dirpath = './../tests/modules/';


describe('ModuleLocator::moduleExists', function() {

    it('moduleExists() should return false because the name is not a string', function() {
        var locator = new ModuleLocator();
        expect(locator.moduleExists(65)).to.equal(false);
    });

    it('moduleExists() should return false because the name is not undefined', function() {
        var locator = new ModuleLocator();
        expect(locator.moduleExists()).to.equal(false);
    });

    it('moduleExists() should return true because the module exists', function() {
        var locator = new ModuleLocator();
        expect(locator.moduleExists('news')).to.equal(true);
    });
});

describe('ModuleLocator::getModule', function() {

    it('getModule() should return null because the name is not a string', function() {
        var locator = new ModuleLocator();
        expect(locator.getModule(65)).to.equal(null);
    });

    it('getModule() should return null because the name is not undefined', function() {
        var locator = new ModuleLocator();
        expect(locator.getModule()).to.equal(null);
    });

    it('getModule() should return object because the module exists', function() {
        var locator = new ModuleLocator();
        expect(locator.getModule('news').value).to.equal("news.json");
    });
});

describe('ModuleLocator::getModuleMain', function() {

    it('getModuleMain() should return null because the name is not a string', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleMain(65)).to.equal(null);
    });

    it('getModuleMain() should return null because the name is not undefined', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleMain()).to.equal(null);
    });

    it('getModuleMain() should return object because the module exists', function() {
        var locator = new ModuleLocator(modulespath, dirpath);
        var Main = locator.getModuleMain('foo');
        var ob = new Main();
        expect(ob.getRoute('/bar').method).to.equal('GET');
    });
});

describe('ModuleLocator::getModuleModel', function() {

    it('getModuleModel() should return null because the name is not a string', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleModel(65)).to.equal(null);
    });

    it('getModuleModel() should return null because the name is not undefined', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleModel()).to.equal(null);
    });

    it('getModuleModel() should return object because the module exists', function() {
        var locator = new ModuleLocator(modulespath, dirpath);
        var Model = locator.getModuleModel('foo');
        var ob = new Model();
        expect(ob.getName()).to.equal('bar');
    });
});

describe('ModuleLocator::getModuleController', function() {

    it('getModuleController() should return null because the name is not a string', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleController(65)).to.equal(null);
    });

    it('getModuleController() should return null because the name is not undefined', function() {
        var locator = new ModuleLocator();
        expect(locator.getModuleController()).to.equal(null);
    });

    it('getModuleController() should return object because the module exists', function() {
        var locator = new ModuleLocator(modulespath, dirpath);
        var Controller = locator.getModuleController('foo');
        var ob = new Controller();
        expect(ob.name).to.equal('foo');
    });
});