'use strict';

var assert = require('assert');
var _ = require('../underscore.js');

describe('underscore', function () {
    describe('#each', function () {
        var count = 0, valSum = 0, idxSum = 0;
        beforeEach(function () {
            count = valSum = idxSum = 0;
        });

        function iterator(v, i) {
            ++count;
            valSum += v;
            idxSum += i;
        }

        function expect(c, vs, is) {
            assert.equal(count, c);
            assert.equal(valSum, vs);
            assert.equal(idxSum, is);
        }

        it('empty array invokes nothing', function () {
            _.each([], iterator);
            expect(0, 0, 0);
        });
        it('null array invokes nothing', function () {
            _.each(null, iterator);
            expect(0, 0, 0);
        });
        it('each value of simple array invoked', function () {
            _.each([2, 4, 6, 8], iterator);
            expect(4, 20, 6);
        });
        it('non-array treated as array with single element', function () {
            _.each(3, iterator);
            expect(1, 3, 0);
        });
    });

    describe('#equals', function () {
        it('empty arrays are equal', function () {
            assert.ok(_.equals([], []));
        });

        it('arrays with the same single element are equal', function () {
            assert.ok(_.equals([1], [1]));
        });
        it('arrays with two different single elements are not equal', function () {
            assert.ok(!_.equals([1], [2]));
        });

        it('two identical simple arrays are equal', function () {
            assert.ok(_.equals([2, 3, 4], [2, 3, 4]));
        });
        it('arrays differing in one entry are not equal', function () {
            assert.ok(!_.equals([2, 3, 4], [2, 2, 4]));
        });
        it('arrays are not equal if first array is prefix', function () {
            assert.ok(!_.equals([2, 3], [2, 3, 4]));
        });
        it('arrays are not equal if second array is prefix', function () {
            assert.ok(!_.equals([2, 3, 4], [2, 3]));
        });

        it('arrays are equal if both are null', function () {
            assert.ok(_.equals(null, null));
        });
        it('not equal, if only first is array is null', function () {
            assert.ok(!_.equals(null, []));
        });
        it('not equal, if only second array is null', function () {
            assert.ok(!_.equals([], null));
        })
    });

    describe('#map', function() {
        function square(x) { return x * x; }

        it('empty list returns empty list', function() {
            assert.deepEqual(_.map([], square), []);
        });
        it('null list returns null', function() {
            assert.equal(_.map(null, square), null);
        });
        it('simple list returns list of squares', function() {
            assert.deepEqual(_.map([0, 1, 2, 3], square), [0, 1, 4 ,9]);
        });
        it('non-list argument is treated as list with one element', function() {
            assert.deepEqual(_.map(3, square), [9]);
        });
    });
});
