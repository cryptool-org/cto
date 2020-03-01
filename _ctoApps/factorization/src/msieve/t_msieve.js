"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
var Worker = require("tiny-worker");    //Use "tiny-worker" for running msieve worker in unit test

@@include('../common/factorizer.js')
@@include('../common/msieve.js')

describe('Msieve', () => {
    let state;
    let factorizer;

    beforeEach(() => {
        state = mockedState.create();
        factorizer = new Factorizer(algo, state);
    });

    describe('Basic factorization functionality', () => {
        it('simple factorization', async () => {
            const factors = await factorizer.factorize('10');
            assert.deepEqual(['2', '5'], factors);
        });

        it('complex factorization', async () => {
            const factors = await factorizer.factorize('(2^283-1)/2');
            const expectedFactors = [
                '3', '3', '7', '283', '2351', '4513', '1681003',
                '13264529', '4375578271', '35273039401', '111349165273',
                '165768537521', '646675035253258729'];
            assert.deepEqual(expectedFactors, factors);
        }).timeout(60000);
    });
});