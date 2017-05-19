"use strict";

function Autokey() {
    // Arrays for keeping track of the plain-/ciphertext
    var autoEn = [];
    var autoDe = [];

    this.encrypt = function (val, idx, key) {
        // Create an entry for each value
        autoEn[idx] = val;
        // Remove all entries after the current one
        autoEn.length = idx + 1;

        if (idx < key.length) {
            var keyVal = this.keyForIdx(key, idx);
            if (val < 0 || keyVal < 0) {
                return val;
            }
            return val + keyVal;
        }
        else {
            var keyVal = this.keyForIdx(val, idx);
            if (val < 0 || keyVal < 0) {
                return val;
            }
            return val + autoEn[idx - key.length];
        }
    };
    this.decrypt = function (val, idx, key) {

        if(idx < key.length) {
            var keyVal = this.keyForIdx(key, idx);
            if (val < 0 || keyVal < 0) {
                return val;
            }
            // Create an entry for each decrypted value
            autoDe[idx] = val - keyVal;
            autoEn.length = idx + 1;

            return val - keyVal;
        }
        else {
            var keyVal = this.keyForIdx(val, idx);
            if (val < 0 || keyVal < 0) {
                return val;
            }
            autoDe[idx] = val - autoDe[idx - key.length];
            autoEn.length = idx + 1;

            return val - autoDe[idx - key.length];
        }
    };
 }

Autokey.prototype = new Vigenere();
algo = new Autokey();