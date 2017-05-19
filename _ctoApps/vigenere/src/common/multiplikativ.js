"use strict";

function Multiplikativ() {
    this.setMKey = function (key) {
        alert("geht");
    }

    this.encrypt = function (val, idx, key) {
        if (val < 0) {
            return val;
        }
        return val * key;
    };
    this.decrypt = function (val, idx, key) {
       if (val < 0) {
            return val;
        }
        var inverse = 0;

        switch (key[0]) {
            case 1:
                inverse = 1;
                break;
            case 3:
                inverse = 9;
                break;
            case 5:
                inverse = 21;
                break;
            case 7:
                inverse = 15;
                break;
            case 9:
                inverse = 3;
                break;
            case 11:
                inverse = 19;
                break;
            case 15:
                inverse = 7;
                break;
            case 17:
                inverse = 23;
                break;
            case 19:
                inverse = 11;
                break;
            case 21:
                inverse = 5;
                break;
            case 23:
                inverse = 17;
                break;
            case 25:
                inverse = 25;
                break;
        }

        return val * inverse;
    };
}
Multiplikativ.prototype = new Vigenere();
algo = new Multiplikativ();