var cconf = require('../index');
var assert = require('assert');

it("should merge ok", function() {
    cconf.merge({
        "a": "foo",
        "b": "bar",
        "c": {
            "name": "Apple",
            "shape": "round"
        }
    });
    assert(cconf.get('a') == 'foo');

    cconf.merge({
        "a": "foo1",
        "b": "bar1",
        "c": {
            "name": "Orange",
            "color": "Yellow"
        }
    });
    assert(cconf.get('a') == 'foo1');
    assert(cconf.get('a') == 'foo1');
    assert(cconf.get('c').shape === 'round');
});

it('should load json file ok', function() {
    cconf.use('test2');
    cconf.file('./tests/lib/global.json');
    cconf.file('./tests/lib/env.json');
    assert(cconf.get('a') == 'foo1');
    assert(cconf.get('c').shape === 'round');
});