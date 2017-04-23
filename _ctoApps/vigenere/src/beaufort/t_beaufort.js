"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/vigenere.js')
@@include('../common/beaufort.js')

describe('Beaufort', () => {
    let state;
    let opts;
    let crypt;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('is symmetrical', () => {
        const plain = 'Just a Test';
        const encrypted = crypt.process(plain, true);
        assert.equal(plain, crypt.process(encrypted, true));
    });
    describe('1st reference value', () => {
        const plain = 'Stanleys Expeditionszug quer durch Afrika wird von jedermann bewundert.';
        const encoded = 'Olhrxigz Ofshrwzkqyofny ssaa piqjn Enbwbg iznf rqe jyehdssfr kcinrfiny.';

        beforeEach(() => {
            state.$key.value = 'Geheimer Schluessel';
        });

        it('can encrypt', () => {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', () => {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
    describe('2nd reference value', () => {
        const plain = 'The quick brown fox jumps over the lazy dog.';
        const encoded = 'Zxy bkliu xbqge zfn vegpk djpt lro tcsg qwy.';

        beforeEach(() => {
            state.$key.value = 'Secret Key';
        });

        it('can encrypt', () => {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', () => {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
