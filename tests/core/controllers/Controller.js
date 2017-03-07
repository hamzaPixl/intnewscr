const chai = require('chai');
const expect = chai.expect;

// dependencies needed for our tests
var Controller = require('./../../../core/controllers/Controller');
var Repository = require('./../../../core/models/Repository');

var repo = new Repository();
var cont = new Controller();

function Request() {
    this.method = 'GET';
    this.baseUrl = "/news";
    this.path = "/trafic";
}
Request.prototype = {
    param: function param(str) {
        return this.params[str];
    }
};

var req = new Request();
/*
cont.request(req).then(function(result) {
    console.log(result);
}, function(err) {
    console.log(err);
});*/