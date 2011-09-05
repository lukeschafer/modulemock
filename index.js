var moduleLib = require('module');
var original = moduleLib.prototype.require;
var assert = require('assert');

module.exports = function(mocks) {
	assert.ok(mocks, 'mocks config not defined');
	original.__mocks = original.__mocks || {};
	for (var k in mocks) {
		assert.ok(mocks[k], 'mocks['+k+'] config not defined');
		original.__mocks[k] = mocks[k];
	}
	
	if (!original.__mocked)
	moduleLib.prototype.require = function(path) {
		return original.__mocks[path] || moduleLib._load(path, this);
	};
	original.__mocked = true;
	
	return module.exports;
}
module.exports.unmock = function(args) {
	for (var i = 0, l = arguments.length; i<=l; i++) {
		if (original.__mocks && original.__mocks[arguments[i]])
			delete original.__mocks[arguments[i]];
	};
}
module.exports.unmockAll = function() {
	for (var k in original.__mocks) {
		module.exports.unmock(k);
	}
	moduleLib.prototype.require = original;
	original.__mocked = false;
}
module.exports.clearModuleCache = function() {
	var m = require('module');
	for (var k in m._cache) {
		delete m._cache[k];
	}
}