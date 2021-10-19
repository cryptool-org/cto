"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/redefence.js')

describe('Redefence', () => {
    let state;
    let opts;
    let crypt;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('z overflows', () => {
        assert.equal('Aa', crypt.process('Zz', true));
    });
    describe('1st reference value', () => {
        const plain = 'Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.';
        const encoded = 'rgilt arna ru yrFtehTd enjkmvrotiucB aamp twle xeran zoesqh.';

        beforeEach(() => {
            state.$key.val = () => ('Geheimer Schluessel');
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
        const encoded = 'hkr xuety oTbjr dqi wfpoe aeco omv hzgu nsl.';

        beforeEach(() => {
            state.$key.val = () => ('Secret Key');
        });

        it('can encrypt', () => {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', () => {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
