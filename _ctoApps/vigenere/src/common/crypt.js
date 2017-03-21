"use strict";

function Crypt(algo, state, opts) {
    this.algo = algo;
    this.state = state;
    this.opts = opts;

    this.charToValue = function(ch) {
        var l = this.state.$alphabets.length;
        for (var i = 0; i < l; ++i) {
            var idx = this.state.$alphabets[i].value.indexOf(ch);
            if (idx >= 0) { return idx; }
        }
        return -1;
    };

    this.valueToChar = function(val, origCh) {
        var $usedAlphabet = undefined;
        if (this.opts.$convertToUpcase.checked && this.state.$alphabets.length > 0) {
            $usedAlphabet = this.state.$alphabets[0];
        } else {
            var l = this.state.$alphabets.length;
            for (var i = 0; ! $usedAlphabet && i < l; ++i) {
                if (this.state.$alphabets[i].value.indexOf(origCh) >= 0) {
                    $usedAlphabet = this.state.$alphabets[i];
                }
            }
        }
        if ($usedAlphabet && $usedAlphabet.value.length) {
            while (val < 0) { val += $usedAlphabet.value.length; }
            val = val % $usedAlphabet.value.length;
            if (val < $usedAlphabet.value.length) {
                return $usedAlphabet.value.substr(val, 1);
            } else {
                return '?';
            }
        }
        return origCh;
    };

    // generic crypto handling

    this.normalizeKey = function() {
        var result = [];
        var keyLength = this.state.$key.value.length;
        for (var i = 0; i < keyLength; ++i) {
            var val = this.charToValue(this.state.$key.value[i]);
            if (val >= 0 || !this.opts.$skipNonLetterKeys.checked) {
                result.push(val);
            }
        }
        return result;
    };

    this.process = function(from, encrypting) {
        var key = this.normalizeKey();
        var fromLength = from.length;
        var k = 0;
        var j = 0;
        var result = '';
        for (var i = 0; i < fromLength; ++i) {
            var ch = from[i];
            var val = this.charToValue(ch);
            if (val >= 0) {
                if (key.length > 0) {
                    if (encrypting) {
                        ch = this.valueToChar(this.algo.encrypt(val, j++, key), ch);
                    } else {
                        ch = this.valueToChar(this.algo.decrypt(val, j++, key), ch);
                    }
                } else {
                    ch = this.valueToChar(val, ch);
                }
            }
            if (ch <= ' ' && this.opts.$deleteWhitespace.checked) {
                continue;
            }
            if (val < 0 && this.opts.$deleteNonLetters.checked) {
                continue;
            }
            if (k && k % 5 == 0 && this.opts.$groupBy5s.checked) {
                result += ' ';
            }
            result += ch; ++k;
        }
        return result;
    }
}