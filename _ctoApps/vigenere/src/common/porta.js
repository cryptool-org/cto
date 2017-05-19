"use strict";

function Porta() {

    this.portaCrypt = function(val, keyVal, alpha) {
        var basis = Math.ceil(alpha.length / 2);
        var text = [];
        for(var i = 0; i < basis; i++)
        {
            text[i] = alpha[i];
        }
        for(var j = 0; j < basis; j++)
        {
            text[j] = alpha[basis + (j - Math.floor((keyVal) / 2) + basis) % basis];
        }
        return text;

    };
    this.encrypt = function (val, idx, key, alphabets) {
        var result = val;
        var alpha = [];
        var alphaLength = alphabets[0].getElementsByClassName('alphabet')[0].value.length;

        for (var i = 0; i < alphaLength; i++) {
            alpha[i] = alphabets[0].getElementsByClassName('alphabet')[0].value.charAt(i);
        }

        var keyLength = key.length;

        var keyVal = this.keyForIdx(key, idx);
        if (val < 0 || keyVal < 0) {
            return val;
        }

        var alpha2 = this.portaCrypt(val, keyVal, alpha);
        var index;

        if (val < alphaLength/2) {
            for(var j = 0; j < alphaLength/2; j++) {
                if (alpha[j].charCodeAt() - 65 == val) {
                    index = j;
                    break;
                }
            }
            result = alpha2[index].charCodeAt() - 65;
        }
        if (val >= alphaLength/2) {
            for(var j = 0; j < alphaLength/2; j++) {
                if (alpha2[j].charCodeAt() - 65 == val) {
                    index = j;
                    break;
                }
            }
            result = alpha[index].charCodeAt() - 65;
        }
        return result;

    };
    this.decrypt = function (val, idx, key, alphabets) {
        return this.encrypt(val, idx, key, alphabets);
    };
 }

Porta.prototype = new Vigenere();
algo = new Porta();