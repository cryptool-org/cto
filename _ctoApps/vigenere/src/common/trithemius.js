"use strict";

function Trithemius() {
    this.encrypt = function (val, idx, key) {
        if (val < 0) {
            return val;
        }
        return val + idx;
    };
    this.decrypt = function (val, idx, key) {
        if (val < 0) {
            return val;
        }
        return val - idx;
    };
}
Trithemius.prototype = new Vigenere();
algo = new Trithemius();