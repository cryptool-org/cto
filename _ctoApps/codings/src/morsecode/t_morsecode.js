"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/morsecode.js')

describe('Morsecode', () => {
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
        const plain = 'FRANZ JAGT IM KOMPLETT VERWAHRLOSTEN TAXI QUER DURCH BAYERN.';
        const encoded = '..-. .-. .- -. --.. / .--- .- --. - / .. -- / -.- --- -- .--. .-.. . - - / ...- . .-. .-- .- .... .-. .-.. --- ... - . -. / - .- -..- .. / --.- ..- . .-. / -.. ..- .-. -.-. .... / -... .- -.-- . .-. -. .-.-.- ';

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
        const plain = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.';
        const encoded = '- .... . / --.- ..- .. -.-. -.- / -... .-. --- .-- -. / ..-. --- -..- / .--- ..- -- .--. ... / --- ...- . .-. / - .... . / .-.. .- --.. -.-- / -.. --- --. .-.-.- ';

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
