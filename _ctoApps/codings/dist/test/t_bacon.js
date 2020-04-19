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

function Bacon() {
    this.encrypt = function (alphabets, input) {
        var output = "";

        input = input.replace(/[^A-Za-z]/g, "");

        var arr = input.split("");

        for (var i=0; i<arr.length; i++) {
            var tmp = arr[i];
            switch (tmp) {
                case "A":
                case "a":
                    output += "aaaaa ";
                    break;
                case "B":
                case "b":
                    output += "aaaab ";
                    break;

                case "C":
                case "c":
                    output += "aaaba ";
                    break;
                case "D":
                case "d":
                    output += "aaabb ";
                    break;

                case "E":
                case "e":
                    output += "aabaa ";
                    break;
                case "F":
                case "f":
                    output += "aabab ";
                    break;

                case "G":
                case "g":
                    output += "aabba ";
                    break;
                case "H":
                case "h":
                    output += "aabbb ";
                    break;

                case "I":
                case "i":
                case "J":
                case "j":
                    output += "abaaa ";
                    break;
                case "K":
                case "k":
                    output += "abaab ";
                    break;

                case "L":
                case "l":
                    output += "ababa ";
                    break;
                case "M":
                case "m":
                    output += "ababb ";
                    break;

                case "N":
                case "n":
                    output += "abbaa ";
                    break;
                case "O":
                case "o":
                    output += "abbab ";
                    break;

                case "P":
                case "p":
                    output += "abbba ";
                    break;
                case "Q":
                case "q":
                    output += "abbbb ";
                    break;

                case "R":
                case "r":
                    output += "baaaa ";
                    break;
                case "S":
                case "s":
                    output += "baaab ";
                    break;

                case "T":
                case "t":
                    output += "baaba ";
                    break;
                case "U":
                case "u":
                case "V":
                case "v":
                    output += "baabb ";
                    break;

                case "W":
                case "w":
                    output += "babaa ";
                    break;
                case "X":
                case "x":
                    output += "babab ";
                    break;

                case "Y":
                case "y":
                    output += "babba ";
                    break;

                case "Z":
                case "z":
                    output += "babbb ";
                    break;

            }
        }

        return output;
    };
    this.decrypt = function (alphabets, input) {

        var output = "";

        input = input.replace(/[^ABab]/g, "");

        input = input.toLowerCase();

        var arr=this.str_split(input, 5);

        for (var i=0; i<arr.length; i++) {
            var tmp = arr[i];
            switch (tmp) {
                case "aaaaa":
                    output += "A";
                    break;
                case "aaaab":
                    output += "B";
                    break;

                case "aaaba":
                    output += "C";
                    break;
                case "aaabb":
                    output += "D";
                    break;

                case "aabaa":
                    output += "E";
                    break;
                case "aabab":
                    output += "F";
                    break;

                case "aabba":
                    output += "G";
                    break;
                case "aabbb":
                    output += "H";
                    break;

                case "abaaa":
                    output += "I";
                    break;
                case "abaab":
                    output += "K";
                    break;

                case "ababa":
                    output += "L";
                    break;
                case "ababb":
                    output += "M";
                    break;

                case "abbaa":
                    output += "N";
                    break;
                case "abbab":
                    output += "O";
                    break;

                case "abbba":
                    output += "P";
                    break;
                case "abbbb":
                    output += "Q";
                    break;

                case "baaaa":
                    output += "R";
                    break;
                case "baaab":
                    output += "S";
                    break;

                case "baaba":
                    output += "T";
                    break;
                case "baabb":
                    output += "U";
                    break;

                case "babaa":
                    output += "W";
                    break;
                case "babab":
                    output += "X";
                    break;

                case "babba":
                    output += "Y";
                    break;

                case "babbb":
                    output += "Z";
                    break;
            }
        }

        return output;
    };
    this.str_split = function (input, splitlength)
    {
        input += '';

        if (splitlength > 0)
        {
            var output = [];
            while (input.length > splitlength)
            {
                output[output.length] = input.substring(0, splitlength);
                input = input.substring(splitlength);
            }
            output[output.length] = input;

            return output;
        }

        return false;
    }

}
let algo = new Bacon();

describe('Bacon', () => {
    let state;
    let opts;
    let crypt;

    beforeEach(() => {
        state = mockedState.create();
        opts = mockedOpts.create();
        crypt = new Crypt(algo, state, opts);
    });

    it('z overflows', () => {
        assert.equal('Aa', crypt.process('Zz', true));
    });
    describe('1st reference value', () => {
        const plain = 'Stanleys Expeditionszug quer durch Afrika wird von jedermann bewundert.';
        const encoded = 'Yxhrtqcj Wzwpxmlasyydbk ygii vwynb Exjmvg apvl hse bgkplqsfr mkabrlqvk.';

        beforeEach(() => {
            state.$key.val = () => ('Geheimer Schluessel');
        });

        it('can encrypt', () => {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', () => {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
    describe('2nd reference value', () => {
        const plain = 'The quick brown fox jumps over the lazy dog.';
        const encoded = 'Llg hybmo zjsye jhh nsetu fzxb xfw pcqc wyk.';

        beforeEach(() => {
            state.$key.val = () => ('Secret Key');
        });

        it('can encrypt', () => {
            assert.equal(encoded, crypt.process(plain, true));
        });
        it('can decrypt', () => {
            assert.equal(plain, crypt.process(encoded, false));
        });
    });
});
