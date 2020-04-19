"use strict";

const assert = require('assert');
const MockedElement = require('../../src/test/mocked_element.js').MockedElement;
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

function Base64() {
    this.encrypt = function (alphabets, input) {
        var _keyStr = "";
        for(var i = 0; i < alphabets.length; i++) {
            _keyStr += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = this._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }

        return output;
    };
    this.decrypt = function (alphabets, input) {
        var _keyStr = "";
        for(var i = 0; i < alphabets.length; i++) {
            _keyStr += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;


        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = this._utf8_decode(output);

        return output;
    };

    this._utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    this._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}
let algo = new Base64();

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
