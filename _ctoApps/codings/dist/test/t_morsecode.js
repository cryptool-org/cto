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

function Morsecode() {
    this.encrypt = function (alphabets, input) {
        var output = "";
        input = input.replace(/[^a-zA-Z0-9äöü!@#\$%\^\&*\)\(+=._-\s]/g, "");
        input = input.toLowerCase();

        var arr = input.split("");

        for(var i = 0; i < arr.length; i++) {
            output += this.enMorse(arr[i]);
        }

        return output;
    };
    this.decrypt = function (alphabets, input) {
        var output = "";
        input = input.replace(/[^/\\.\-\s]/g, "");

        var arr = input.split(" ");

        for(var i = 0; i < arr.length; i++) {
            output += this.deMorse(arr[i]);
        }

        return output;
    };

    this.enMorse = function(character) {

        var output="";
        switch (character)
        {
            case "a": output+=".- ";
                break;
            case "b": output+="-... ";
                break;

            case "c": output+="-.-. ";
                break;
            case "d": output+="-.. ";
                break;

            case "e": output+=". ";
                break;
            case "f": output+="..-. ";
                break;

            case "g": output+="--. ";
                break;
            case "h": output+=".... ";
                break;

            case "i": output+=".. ";
                break;
            case "j": output+=".--- ";
                break;
            case "k": output+="-.- ";
                break;

            case "l": output+=".-.. ";
                break;
            case "m": output+="-- ";
                break;

            case "n": output+="-. ";
                break;
            case "o": output+="--- ";
                break;

            case "p": output+=".--. ";
                break;
            case "q": output+="--.- ";
                break;

            case "r": output+=".-. ";
                break;
            case "s": output+="... ";
                break;

            case "t": output+="- ";
                break;
            case "u": output+="..- ";
                break;
            case "v": output+="...- ";
                break;

            case "w": output+=".-- ";
                break;

            case "x": output+="-..- ";
                break;

            case "y": output+="-.-- ";
                break;

            case "z": output+="--.. ";
                break;

            case "1": output+=".---- ";
                break;
            case "2": output+="..--- ";
                break;

            case "3": output+="...-- ";
                break;
            case "4": output+="....- ";
                break;
            case "5": output+="..... ";
                break;

            case "6": output+="-.... ";
                break;

            case "7": output+="--... ";
                break;

            case "8": output+="---.. ";
                break;

            case "9": output+="----. ";
                break;

            case "0": output+="----- ";
                break;


            case " ": output+="/ ";
                break;


            case ".": output+=".-.-.- ";
                break;

            case ",": output+="--..-- ";
                break;

            case "?": output+="..--..  ";
                break;

            case "'": output+=".----. ";
                break;

            case "!": output+="-.-.-- ";
                break;

            case "/": output+="-..-. ";
                break;

            case "(": output+="-.--. ";
                break;

            case ")": output+="-.--.- ";
                break;

            case "&": output+=".-... ";
                break;

            case "@": output+=".--.-. ";
                break;

            case "$": output+="...-..- ";
                break;

            case '"': output+=".-..-. ";
                break;
            case "_": output+="..--.- ";
                break;

            case "-": output+="-....- ";
                break;
            case "+": output+=".-.-. ";
                break;
            case "=": output+="-...- ";
                break;

            case ";": output+="-.-.-. ";
                break;

            case ":": output+="---... ";
                break;


            case "ä": output+=".-.- ";
                break;
            case "ö": output+="---. ";
                break;

            case "ü": output+="..-- ";
                break;
        }
        return (output);
    }

    this.deMorse = function(fragment) {
        var output = "";
        switch (fragment)
        {
            case ".-": output="A";
                break;
            case "-...": output="B";
                break;

            case "-.-.": output="C";
                break;
            case "-..": output="D";
                break;

            case ".": output="E";
                break;
            case "..-.": output="F";
                break;

            case "--.": output="G";
                break;
            case "....": output="H";
                break;

            case "..": output="I";
                break;

            case ".---": output="J";
                break;

            case "-.-": output="K";
                break;

            case ".-..": output="L";
                break;
            case "--": output="M";
                break;

            case "-.": output="N";
                break;
            case "---": output="O";
                break;

            case ".--.": output="P";
                break;
            case "--.-": output="Q";
                break;

            case ".-.": output="R";
                break;
            case "...": output="S";
                break;

            case "-": output="T";
                break;

            case "..-": output="U";
                break;

            case "...-": output="V";
                break;

            case ".--": output="W";
                break;

            case "-..-": output="X";
                break;

            case "-.--": output="Y";
                break;

            case "--..": output="Z";
                break;

            case "-----": output="0";
                break;
            case ".----": output="1";
                break;

            case "..---": output="2";
                break;
            case "...--": output="3";
                break;

            case "....-": output="4";
                break;
            case ".....": output="5";
                break;

            case "-....": output="6";
                break;

            case "--...": output="7";
                break;

            case "---..": output="8";
                break;

            case "----.": output="9";
                break;

            case "/": output=" ";
                break;

            case ".-.-.-": output=".";
                break;
            case "--..--": output=",";
                break;

            case "..--..": output="?";
                break;
            case ".----.": output="'";
                break;

            case "-.-.--": output="!";
                break;
            case "-..-.": output="/";
                break;

            case "-.--.": output="(";
                break;

            case "-.--.-": output=")";
                break;

            case ".-...": output="&";
                break;

            case "---...": output=":";
                break;

            case "-.-.-.": output=";";
                break;
            case "-...-": output="=";
                break;

            case ".-.-.": output="+";
                break;
            case "-....-": output="-";
                break;

            case "..--.-": output="_";
                break;
            case ".-..-.": output='"';
                break;

            case "...-..-": output="$";
                break;

            case ".--.-.": output="@";
                break;

            case "---..": output="8";
                break;

            case ".-.-": output="Ä";
                break;

            case "---.": output="Ö";
                break;

            case "..--": output="Ü";
                break;

            case "": break;

            default:
                break;
        }
        return output;
    }


}
let algo = new Morsecode();

describe('Morsecode', () => {
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
