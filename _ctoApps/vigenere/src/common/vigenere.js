"use strict";

function Vigenere() {
    this.keyForIdx = function (key, idx) {
        if (key.length <= 0) {
            return -1;
        }
        return key[idx % key.length];
    };
    this.encrypt = function (val, idx, key) {
        var keyVal = this.keyForIdx(key, idx);
        if (val < 0 || keyVal < 0) {
            return val;
        }
        return val + keyVal;
    };
    this.decrypt = function (val, idx, key) {
        var keyVal = this.keyForIdx(key, idx);
        if (val < 0 || keyVal < 0) {
            return val;
        }
        return val - keyVal;
    };
};
var algo = new Vigenere();