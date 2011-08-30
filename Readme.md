
# modulemock

  mock module requires for nodejs
  
## What's it do?

  - override what will be returned by a require call
  - simplifies unit testing
  - remove overrides (e.g. teardown) 
  - doesn't actually perform mocking functionality like spies etc, but allows you to set a mock in place of a module

## Example

    //call this first
    var moduleMock = require('moduleMock')({
        'http': {
            get: function() {
                console.log('mocked!');
                return {on:function(){}};
            }
        }
    });

    var send = require('../lib/send.js');
    send.get();

## API

Create

    var modulemock = require('modulemock');

Mock a module

    modulemock({'http':{}});

Remove a fake module

    modulemock.unmock('http');

Remove all fake modules

    modulemock.unmockAll();

Clear module cache (only node_modules and yours, not in-builts)

    modulemock.clearModuleCache();

For more usage examples, check out the tests in tests/modulemock.tests.js


## License: The MIT License

Copyright (c) 2011 Luke Schafer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
