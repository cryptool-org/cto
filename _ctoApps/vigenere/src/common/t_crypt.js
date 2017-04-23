"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/vigenere.js')

describe('Basic Crypt functionality', () => {
    let state;
    let opts;
    let crypt;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('should encrypt both alphabets', () => {
        assert.equal('Bcd', crypt.process('Abc', true));
    });
    it('should decrypt both alphabets', () => {
        assert.equal('Abc', crypt.process('Bcd', false));
    });
    it('should convert to first alphabet', () => {
        opts.$convertToUpcase.checked = true;
        assert.equal('BCD', crypt.process('Abc', true));
    });
    it('should not filter non-alphabet chars', () => {
        assert.equal('B c.d', crypt.process('A b.c', true));
    });
    it('should filter white spaces', () => {
        opts.$deleteWhitespace.checked = true;
        assert.equal('Bc.d', crypt.process('A b.c', true));
    });
    it('should filter non-alphabet chars', () => {
        opts.$deleteNonLetters.checked = true;
        assert.equal('Bcd', crypt.process('A b.c', true));
    });
    it('should not filter non-alphabet key chars', () => {
        opts.$skipNonLetterKeys.checked = false;
        assert.equal('Acc', crypt.process('Abc', true));
    });
    it('should group by 5s', () => {
        opts.$groupBy5s.checked = true;
        assert.equal('bcdef gh', crypt.process('abcdefg', true));
    });
    it('should honour offset in key alphabet', () => {
        state.$key = { value: 'a' };
        state.$keyAlphabets = [new mockedState.MockedElement({
            alphabet: { value: 'ab' },
            offset: { innerText: '1' }
        })];
        assert.equal(crypt.process('abc', true), 'bcd');
    })
});
