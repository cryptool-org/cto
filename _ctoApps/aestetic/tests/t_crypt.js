'use strict';

var assert = require('assert');

global.$ = function() { return null; }
global.removeBetween = function() {}
global.writeBytes = function() {}

global.dom = {
    hasClass: function() { return false; }
};

var _ = require('../underscore.js');
global._ = _;
global.fb = _.fb;
require('./helper/mock_aes.js');
var cfg = require('../config.js');
global.Chaining = cfg.Chaining;
var key = require('../key.js');
global.mult = key.mult;
var crypt = require('../crypt.js');
global.encode = crypt.encode;
global.decode = crypt.decode;
var chaining = require('../chaining.js');

describe('test vectors', function() {
    _.each(cfg.testcases, function(tc) {
        describe(tc.name, function() {
            tc.sbox = cfg.defaults.sbox;
            tc.permute = cfg.defaults.permute;
            tc.blockSize = cfg.defaults.blockSize;
            var ek = key.expandKey(tc);
            it('encryption', function() {
                var encoded = chaining.encode_chain(tc, ek);
                assert.deepEqual(encoded, tc.encoded);
            });
            it('decryption', function() {
                var decoded = chaining.decode_chain(tc.encoded, tc, ek);
                assert.deepEqual(decoded, tc.input);
            });
        });
    });
});
