var utils = require('../lib/utils');
var assert = require('assert');

it("should deep_copy be ok", function() {
    //number, string, boolean, undefined
    var a = 1, b = "foobar", c = false, d = undefined;
    var a1 = utils.deep_copy(a),
        b1 = utils.deep_copy(b),
        c1 = utils.deep_copy(c),
        d1 = utils.deep_copy(d);
    assert(a === a1);
    a = 2;
    assert(a !== a1);

    assert(b === b1);
    b = "bar";
    assert(b !== b1);

    assert(c === c1);
    c = true;
    assert(c !== c1);

    assert(d === d1);
    d = "test";
    assert(d !== d1);

    //plain empty object
    var o = {},
        o1 = utils.deep_copy(o);
    assert(o !== o1);

    //plain object
    var o = {
            a: "a",
            b: {
                c: "c"
            }
        },
        o1 = utils.deep_copy(o);

    assert(o !== o1);
    assert(o1.b !== undefined && o1.a !== undefined);

    assert(o.b !== o1.b);
    assert(o.a === o1.a);
    assert(o.b.c === o1.b.c);

    o.b == "a1";
    assert(o.b !== o1.b);

    //special objects
    var d = new Date(),
        d1 = utils.deep_copy(d);
    assert(d !== d1);
});


it("should object_deep_merge be ok", function() {
    //number, string, boolean, undefined
    var a = 1, b = "foobar", c = false, d = undefined;
    var b1 = utils.object_deep_merge(a, b);
    assert(b === "foobar");
    assert(b1 === b);

    var c1 = utils.object_deep_merge(b, c);
    assert(c1 === c);
    assert(c1 !== b);

    //ojects & plain values
    var o = {};
    var o1 = utils.object_deep_merge(a, o);
    assert(o !== o1);
    assert(o1 !== a);

    var o2 = utils.object_deep_merge(o, a);
    assert(o2 === a);
    assert(o2 !== o);


    //objects & objects
    var o1 = {
            a: 'a',
            b: {
                c: 'c'
            }
        },
        o2 = {
            a: 'a1',
            b: {
                d: 'd',
                c: 'c1',
                f: {
                    g: 'g'
                }
            },
            e: 'e'
        };
    var o3 = utils.object_deep_merge(o1, o2),
        o4 = utils.object_deep_merge(o2, o1);
    assert(o3 !== o1);
    assert(o3 !== o2);

    assert(o3.a === o2.a && o3.a !== o1.a);
    assert(o3.e === 'e');
    assert(o3.b.c === 'c1' && o3.b.d == 'd');
    assert(o3.b.f !== o2.b.f);

    assert(o4.a === 'a');
    assert(o4.b.d === 'd');
    assert(o4.b.c === 'c');
    assert(o4.e === o2.e);
    assert(o4.b.f !== o2.b.f);

    //merge arrays
    var o1 = ['a', 'b'],
        o2 = ['c', 'd', 'e'];
    var o3 = utils.object_deep_merge(o1, o2);
    assert(o3[0] == 'c');
    assert(o3[1] == 'd');
    assert(o3[2] === 'e');
});

it("should object_merge be ok", function() {
    var o1 = {}, o2 = {}, o3 = "string";
    var o4 = utils.object_merge(o1, o2, o3);
    assert(o4 === o3);

    var o1 = 'string',
        o2 = { a: 'a', b: {c: 'c'} },
        o3 = { a: 'a1', b: {d: 'd'} };
    var o4 = utils.object_merge(o1, o2, o3);
    assert(o4 !== o1);
    assert(typeof o4 === 'object');
    assert(o4.a === 'a1');
    assert(o4.b !== o2.b && o4.b !== o3.b);
    assert(o4.b.c === o2.b.c);
    assert(o4.b.d === o3.b.d);

});
