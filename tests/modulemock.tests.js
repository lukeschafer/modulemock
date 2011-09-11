#!/usr/bin/env node
var assert = require('assert');
var modulemock = require('../index.js');

var tests = {
	teardown: function(done) {
		modulemock.unmockAll();
		modulemock.clearModuleCache();
		modulemock = require('../index.js');
		done();
	},
	"can get mocked module": function() {
		var actualHttp = require('http');
		var httpMock = {};
		modulemock({"http":httpMock});
		assert.strictEqual(httpMock, require('http'));
	},
	"can get real module": function() {
		var actualModule = require('module');
		modulemock({"http":{}});
		assert.strictEqual(actualModule, require('module'));
	},
	"can unmock one": function() {
		var actualHttp = require('http');
		var httpMock = {};
		modulemock({"http":httpMock});
		assert.strictEqual(httpMock, require('http'));
		modulemock.unmock('http');
		assert.ok(httpMock != require('http'));
	},
	"can unmock all": function() {
		var actualHttp = require('http');
		var actualTest = require('./fortest.js');
		var httpMock = {};
		var testMock = {};
		modulemock({"http":httpMock});
		modulemock({"./fortest.js":testMock});
		assert.strictEqual(httpMock, require('http'));
		assert.strictEqual(testMock, require('./fortest.js'));
		modulemock.unmockAll();
		assert.ok(httpMock != require('http'));
		assert.ok(testMock != require('./fortest.js'));
	},
	"can clear module cache": function() {
		var test = require('./fortest.js');
		var test2 = require('./fortest.js');
		assert.strictEqual(test, test2);
		modulemock.clearModuleCache();
		test2 = require('./fortest.js');
		assert.ok(test !== test2);
	},
	"clear cache doesn't clear in-built libs, damn": function() {
		var test = require('http');
		var test2 = require('http');
		assert.strictEqual(test, test2);
		modulemock.clearModuleCache();
		test2 = require('http');
		assert.ok(test === test2);
	},
	"subsequent calls override previous": function() {
		var httpMock1 = {};
		var httpMock2 = {};
		
		modulemock({http:httpMock1});
		var mock1 = require('http');
		assert.strictEqual(httpMock1, mock1);
		
		modulemock({http:httpMock2});
		var mock2 = require('http');
		assert.strictEqual(httpMock2, mock2);
		
		assert.ok(mock1 !== mock2);
	},
	"shares a mock over multiple requires": function() {
		var httpMock = {};
		modulemock({"http":httpMock});
		var http1 = require('http');
		var http2 = require('./fortest.js').test.getHttp();
		var http3 = require('./fortest2.js').test.getHttp();
		assert.strictEqual(http1, http2);
		assert.strictEqual(http1, http3);
	}
};

var path = require('path');
require('noderunner')
	.setup({showSuccesses:true, suppressConsole:false})
	.addFile('sometests1', path.resolve('./sometests1.js'))
	.addFile('sometests2', path.resolve('./sometests2.js'))
	.add("modulemock.tests", tests, function(){})
	.run();
