"use strict";

function Crypt(algo, state, opts) {
    this.algo = algo;
    this.state = state;
    this.opts = opts;

    this.charToValue = function(ch, $alphabets) {
        var l = $alphabets.length;
        for (var i = 0; i < l; ++i) {
            var value = $alphabets[i].getElementsByClassName('alphabet')[0].value;
            var offset =  parseInt($alphabets[i].getElementsByClassName('offset')[0].innerText);
            var idx = value.indexOf(ch);
            if (idx >= 0) {
                var res = idx + offset;
                while (res < 0) { res += value.length; }
                return res % value.length;
            }
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
                if (this.state.$alphabets[i].getElementsByClassName('alphabet')[0].value.indexOf(origCh) >= 0) {
                    $usedAlphabet = this.state.$alphabets[i];
                }
            }
        }
        if ($usedAlphabet) {
            var value = $usedAlphabet.getElementsByClassName('alphabet')[0].value;
            var offset = parseInt($usedAlphabet.getElementsByClassName('offset')[0].innerText);
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
        var result = [];
        var keyValue = this.state.$key.value;
        var keyLength = keyValue.length;
        var $alphabets = this.state.$keyAlphabets;
        if (! $alphabets) { $alphabets = this.state.$alphabets; }
        for (var i = 0; i < keyLength; ++i) {
            var val = this.charToValue(keyValue[i], $alphabets);
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
            var val = this.charToValue(ch, this.state.$alphabets);
            if (val >= 0) {
                if (key.length > 0) {
                    if (encrypting) {
                        ch = this.valueToChar(this.algo.encrypt(val, j++, key, this.state.$alphabets), ch);
                    } else {
                        ch = this.valueToChar(this.algo.decrypt(val, j++, key, this.state.$alphabets), ch);
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
            if (k && k % 5 === 0 && this.opts.$groupBy5s.checked) {
                result += ' ';
            }
            result += ch; ++k;
        }
        return result;
    }
}