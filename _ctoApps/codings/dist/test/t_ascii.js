"use strict";

const assert = require('assert');
const mockedState = require('../../src/test/mocked_state.js');
const mockedOpts = require('../../src/test/mocked_opts.js');

"use strict";

function Crypt(algo, state, opts) {
    this.algo = algo;
    this.state = state;
    this.opts = opts;

    this.charToValue = function(ch, $alphabets) {
        const l = $alphabets.length;
        for (let i = 0; i < l; ++i) {
            const value = $alphabets[i].getElementsByClassName('alphabet')[0].value;
            const offset =  parseInt($alphabets[i].getElementsByClassName('offset')[0].innerText);
            const idx = value.indexOf(ch);
            if (idx >= 0) {
                let res = idx + offset;
                while (res < 0) { res += value.length; }
                return res % value.length;
            }
        }
        return -1;
    };

    this.valueToChar = function(val, origCh) {
        let $usedAlphabet = undefined;
        if (this.opts.$convertToUpcase.prop('checked') && this.state.$alphabets.length > 0) {
            $usedAlphabet = this.state.$alphabets[0];
        } else {
            const l = this.state.$alphabets.length;
            for (let i = 0; ! $usedAlphabet && i < l; ++i) {
                if (this.state.$alphabets[i].getElementsByClassName('alphabet')[0].value.indexOf(origCh) >= 0) {
                    $usedAlphabet = this.state.$alphabets[i];
                }
            }
        }
        if ($usedAlphabet) {
            let value = $usedAlphabet.getElementsByClassName('alphabet')[0].value;
            const offset = parseInt($usedAlphabet.getElementsByClassName('offset')[0].innerText);
            if (value.length) {
                val -= offset;
                while (val < 0) {
                    val += value.length;
                }
                val = val % value.length;
                return value.substr(val, 1);
            }
        }
        return origCh;
    };

    // generic crypto handling

    this.normalizeKey = function() {
        let result = [];
        const keyValue = this.state.$key.val();
        const keyLength = keyValue.length;
        let $alphabets = this.state.$keyAlphabets;
        if (! $alphabets) { $alphabets = this.state.$alphabets; }
        for (let i = 0; i < keyLength; ++i) {
            const val = this.charToValue(keyValue[i], $alphabets);
            if (val >= 0 || !this.opts.$skipNonLetterKeys.prop('checked')) {
                result.push(val);
            }
        }
        return result;
    };

    this.process = function(from, encrypting) {
        let k = 0;
        let j = 0;
        let result = '';

        if (encrypting) {
            result = this.algo.encrypt(this.state.$alphabets, from);
        } else {
            result = this.algo.decrypt(this.state.$alphabets, from);
        }
        return result;
    }
}
"use strict";

function Ascii() {
    
    this.padStringWithLeadingZeros = function(_string, _length) {
        var string = _string;
        while(string.length < _length) {
            string = "0" + string;
        }
        return string;
    };
    
    this.encrypt = function (_alphabets, _input) {
        var output = "";
        var input = _input;
        for(var i=0; i<input.length; i++) {
            if(output.length > 0) {
                output += " ";
            }
            output += this.padStringWithLeadingZeros((input.charCodeAt(i) >>> 0).toString(2), 8);
        }
        return output;
    };
    
    this.decrypt = function (_alphabets, _input) {
        var output = "";
        var input = _input;
        input = input.replace(/[^0-1]+/g, "");
        while(input.length >= 8) {
            var integerString = input.substr(0, 8);
            var integerDecimal = parseInt(integerString, 2).toString(10);
            output += String.fromCharCode(integerDecimal);
            input = input.substr(8, input.length - 8);
        }
        return output;
    };
    
}

let algo = new Ascii();


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
