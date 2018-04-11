"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

@@include('./barcodeutilities.js')

describe('Barcode', () => {
    let state;
    let opts;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
    });

    describe("Test supported barcode standards", () => {
        it("can set \"CODABAR\"", () => { assert.equal(BarcodeStandardSet("CODABAR"), true); });
        it("can set \"CODE128\"", () => { assert.equal(BarcodeStandardSet("CODE128"), true); });
        it("can set \"CODE39\"", () => { assert.equal(BarcodeStandardSet("CODE39"), true); });
        it("can set \"EAN13\"", () => { assert.equal(BarcodeStandardSet("EAN13"), true); });
        it("can set \"EAN8\"", () => { assert.equal(BarcodeStandardSet("EAN8"), true); });
        it("can set \"UPC\"", () => { assert.equal(BarcodeStandardSet("UPC"), true); });
    });
});
