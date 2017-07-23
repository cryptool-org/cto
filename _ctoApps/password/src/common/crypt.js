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