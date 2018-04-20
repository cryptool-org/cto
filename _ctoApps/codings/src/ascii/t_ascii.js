"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/ascii.js')

describe('Ascii', () => {
    let state;
    let opts;
    let crypt;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    describe('1st reference value', () => {
        const plain = "Geben Sie hier den Klartext ein.";
        const encoded = "01000111 01100101 01100010 01100101 01101110 00100000 01010011 01101001 01100101 00100000 01101000 01101001 01100101 01110010 00100000 01100100 01100101 01101110 00100000 01001011 01101100 01100001 01110010 01110100 01100101 01111000 01110100 00100000 01100101 01101001 01101110 00101110";
        it('can encode', () => {
            assert.equal(crypt.process(plain, true), encoded);
        });
        it('can decode', () => {
            assert.equal(crypt.process(encoded, false), plain);
        });
    });
    
    describe('2nd reference value', () => {
        const plain = "Enter the cleartext here.";
        const encoded = "01000101 01101110 01110100 01100101 01110010 00100000 01110100 01101000 01100101 00100000 01100011 01101100 01100101 01100001 01110010 01110100 01100101 01111000 01110100 00100000 01101000 01100101 01110010 01100101 00101110";
        it('can encode', () => {
            assert.equal(crypt.process(plain, true), encoded);
        });
        it('can decode', () => {
            assert.equal(crypt.process(encoded, false), plain);
        });
    });
});
