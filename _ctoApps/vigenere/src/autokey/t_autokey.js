"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/vigenere.js')
@@include('../common/autokey.js')

describe('Autokey', function() {
    let state;
    let opts;
    let crypt;

    beforeEach(function() {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('is symmetrical', function() {
        const plain = 'Just a Test';
        const encrypted = crypt.process(plain, true);
        assert.equal(plain, crypt.process(encrypted, true));
    });
    describe('1st reference value', function() {
        const plain = 'Stanleys Expeditionszug quer durch Afrika wird von jedermann bewundert.';
        const encoded = 'Yxhrtqcj Wzwpxmlasyksut bycj hrggk Iyzwxs vcxt pse myugymfev lescegzfg.';

        beforeEach(function() {
            state.$key.val = () => 'Geheimer Schluessel';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
    describe('2nd reference value', function() {
        const plain = 'The quick brown fox jumps over the lazy dog.';
        const encoded = 'Llg hybmo zkvad zwz tvddo baso cbq asnt hfz.';

        beforeEach(function() {
            state.$key.val = () => 'Secret Key';
        });

        it('can encrypt', function() {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', function() {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
