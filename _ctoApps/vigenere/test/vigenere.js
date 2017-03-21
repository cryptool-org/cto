"use strict";

var assert = require('assert');
var mockedState = require('../test/src/mocked_state.js');
var mockedOpts = require('../test/src/mocked_opts.js');

@@include('../src/crypt.js')
@@include('../src/vigenere.js')

describe('Vigenère', function() {
    var state;
    var opts;
    var crypt;

    beforeEach(function() {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('z overflows', function() {
        assert.equal('Aa', crypt.process('Zz', true));
    });
    describe('1st reference value', function() {
        var plain = 'Stanleys Expeditionszug quer durch Afrika wird von jedermann bewundert.';
        var encoded = 'Yxhrtqcj Wzwpxmlasyydbk ygii vwynb Exjmvg apvl hse bgkplqsfr mkabrlqvk.';

        beforeEach(function() {
            state.$key.value = 'Geheimer Schluessel';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
    describe('2nd reference value', function() {
        var plain = 'The quick brown fox jumps over the lazy dog.';
        var encoded = 'Llg hybmo zjsye jhh nsetu fzxb xfw pcqc wyk.';

        beforeEach(function() {
            state.$key.value = 'Secret Key';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
