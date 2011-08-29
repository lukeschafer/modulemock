var moduleLib = require('module');
var original = moduleLib.prototype.require;
var assert = require('assert');

module.exports = function(mocks) {
	assert.ok(mocks, 'mocks config not defined');
	var existingMocks = moduleLib.prototype.require.mocks || {};
	for (var k in mocks) {
		assert.ok(mocks[k], 'mocks['+k+'] config not defined');
		existingMocks[k] = mocks[k];
	}
	
	moduleLib.prototype.require = function(path) {
		return existingMocks[path] || moduleLib._load(path, this);
	};
	moduleLib.prototype.require.mocked = true;
	moduleLib.prototype.require.mocks = existingMocks;
	
	return module.exports;
}
module.exports.unmock = function(args) {
	for (var i = 0, l = arguments.length; i<=l; i++) {
		if (moduleLib.prototype.require.mocks && moduleLib.prototype.require.mocks[arguments[i]])
			moduleLib.prototype.require.mocks[arguments[i]] = false;
	};
}
module.exports.unmockAll = function() {
	for (var k in moduleLib.prototype.require.mocks) {
		module.exports.unmock(k);
	}
	moduleLib.prototype.require = original;
}
module.exports.clearModuleCache = function() {
	var m = require('module');
	for (var k in m._cache) {
		//if (k.indexOf('node_modules')) I HAD THIS HERE BUT CAN'T REMEMBER WHY! All tests work with/without it... was I testing something?
		delete m._cache[k];
	}
}