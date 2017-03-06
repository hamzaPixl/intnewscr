const chai = require('chai');
const expect = chai.expect;

// dependencies needed for our tests
var ConfigReader = require('./../../../core/configs/ConfigReader');

describe('ConfigReader::getModuleName', function() {

    it('getModuleName() should return the name of the module used on instantiation', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.getModuleName()).to.equal('test');
    });

    it('getModuleName() should return the name of the module used on instantiation', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            }
        };
        var config = new ConfigReader('test2', moduleLocatorMock);
        expect(config.getModuleName()).to.equal('test2');
    });

    it('getModuleName() should return the name of the module used on instantiation', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            }
        };
        var config = new ConfigReader('teNjkdn2', moduleLocatorMock);
        expect(config.getModuleName()).to.equal('teNjkdn2');
    });

    it('getModuleName() should return the name of the module used on instantiation', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            }
        };
        var config = new ConfigReader('tes t DJKF 25', moduleLocatorMock);
        expect(config.getModuleName()).to.equal('tes t DJKF 25');
    });

});

describe('ConfigReader::getModuleConfigurationDefinition', function() {


    it('getModuleConfigurationDefinition() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.getModuleConfigurationDefinition()).to.equal(null);
    });

    it('getModuleConfigurationDefinition() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader(53, moduleLocatorMock);
        expect(config.getModuleConfigurationDefinition()).to.equal(null);
    });

    it('getModuleConfigurationDefinition() should return object because module exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            },
            getModule: function getModule(name) {
                return { "check": "configuration.json" };
            }
        };
        var config = new ConfigReader('name', moduleLocatorMock, './../../tests/core/configs/');
        var moduleConfig = config.getModuleConfigurationDefinition();
        expect(moduleConfig['services']['test']['foo']).to.equal('bar');
        expect(moduleConfig['config']['test']['type']).to.equal('string');
    });

});

describe('ConfigReader::getModuleConfigurationValue', function() {


    it('getModuleConfigurationValue() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.getModuleConfigurationValue()).to.equal(null);
    });

    it('getModuleConfigurationValue() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader(53, moduleLocatorMock);
        expect(config.getModuleConfigurationValue()).to.equal(null);
    });

    it('getModuleConfigurationValue() should return object because module exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            },
            getModule: function getModule(name) {
                return { "value": "value.json" };
            }
        };
        var config = new ConfigReader('name', moduleLocatorMock, null, './../../tests/core/configs/');
        var moduleConfig = config.getModuleConfigurationValue();
        expect(moduleConfig['foo']).to.equal('bar');
    });

});

describe('ConfigReader::getServices', function() {


    it('getServices() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.getServices()).to.equal(null);
    });

    it('getServices() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader(53, moduleLocatorMock);
        expect(config.getServices()).to.equal(null);
    });

    it('getServices() should return object because module exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            },
            getModule: function getModule(name) {
                return { "value": "value.json", "check": "configuration.json" };
            }
        };
        var config = new ConfigReader('name', moduleLocatorMock, './../../tests/core/configs/', './../../tests/core/configs/');
        var moduleServices = config.getServices();
        expect(moduleServices['test']['foo']).to.equal('bar');
    });

});

describe('ConfigReader::configIsValid', function() {


    it('configIsValid() should return false because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.configIsValid()).to.equal(false);
    });

    it('configIsValid() should return false because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader(53, moduleLocatorMock);
        expect(config.configIsValid()).to.equal(false);
    });

    it('configIsValid() should return true because module exists and it is valid', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            },
            getModule: function getModule(name) {
                return { "value": "value.json", "check": "configuration.json" };
            }
        };
        var config = new ConfigReader('name', moduleLocatorMock, './../../tests/core/configs/', './../../tests/core/configs/');
        expect(config.configIsValid()).to.equal(true);
    });

});

describe('ConfigReader::getConfig', function() {


    it('getConfig() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader('test', moduleLocatorMock);
        expect(config.getConfig()).to.equal(null);
    });

    it('getConfig() should return null because module does not exists ', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return false;
            }
        };
        var config = new ConfigReader(53, moduleLocatorMock);
        expect(config.getConfig()).to.equal(null);
    });

    it('getConfig() should return object because module exists and it is valid', function() {
        var moduleLocatorMock = {
            moduleExists: function moduleExists() {
                return true;
            },
            getModule: function getModule(name) {
                return { "value": "value.json", "check": "configuration.json" };
            }
        };
        var config = new ConfigReader('name', moduleLocatorMock, './../../tests/core/configs/', './../../tests/core/configs/');
        expect(config.getConfig()['foo']).to.equal('bar');
    });

});