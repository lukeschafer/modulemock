var assert = require('assert');
var http;
module.exports = {
	setup: function(done) {
		require('../index.js')({'http':{foo:function(){return 'baz';}}});
		http = require('http');
		done();
	},
	teardown: function(done) {
		require('../index.js').unmockAll();
		done();
	},
	"I should be able to call a fake function on http": function() {
		assert.equal('baz', http.foo());
	}
}