"use strict";

const assert = require('assert');
const MockedElement = require('../../src/test/mocked_element.js').MockedElement;
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('../common/crypt.js')
@@include('../common/taxman.js')

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
        opts.$convertToUpcase.prop = () => true;
        assert.equal('BCD', crypt.process('Abc', true));
    });
    it('should not filter non-alphabet chars', () => {
        assert.equal('B c.d', crypt.process('A b.c', true));
    });
    it('should filter white spaces', () => {
        opts.$deleteWhitespace.prop = () => true;
        assert.equal('Bc.d', crypt.process('A b.c', true));
    });
    it('should filter non-alphabet chars', () => {
        opts.$deleteNonLetters.prop = () => true;
        assert.equal('Bcd', crypt.process('A b.c', true));
    });
    it('should not filter non-alphabet key chars', () => {
        opts.$skipNonLetterKeys.prop = () => false;
        assert.equal('Acc', crypt.process('Abc', true));
    });
    it('should group by 5s', () => {
        opts.$groupBy5s.prop = () => true;
        assert.equal('bcdef gh', crypt.process('abcdefg', true));
    });
    it('should honour offset in key alphabet', () => {
        state.$key = { val: () => ('a') };
        state.$keyAlphabets = [new MockedElement({
            alphabet: { value: 'ab' },
            offset: { innerText: '1' }
        })];
        assert.equal(crypt.process('abc', true), 'bcd');
    })
});
