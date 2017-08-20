"use strict";

function Enigma() {
    const rolls = [
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "ESOVPZJAYQUIRHXLNFTGKDCMWB",
        "VZBRGITYUPSDNHLXAWMJQOFECK"
    ];
    const inverters = [
        "AEBJCMDZFLGYHXIVKWNROQPUST",
        "AYBRCUDHEQFSGLIPJXKNMOTZVW",
        "AFBVCPDJEIGOHYKRLZMXNWQTSU"
    ];

    this.rolls = [];
    for (let i = 0; i < rolls.length; ++i) {
        const mapping = rolls[i];
        const roll = { forward: [], backward: [] };
        for (let j = 0; j < 26; ++j) {
            const val = mapping.charCodeAt(j) - "A".charCodeAt(0);
            roll.forward[j + 1] = val;
            roll.backward[val] = j + 1;
        }
        this.rolls.push(roll);
    }

    this.inverters = [];
    for (let i = 0; i < inverters.length; ++i) {
        const mapping = rolls[i];
        const roll = { forward: [], backward: [] };
        for (let j = 0; j < 26; j += 2) {
            const a = mapping.charCodeAt(j) - "A".charCodeAt(0);
            const b = mapping.charCodeAt(j + 1) - "A".charCodeAt(0);
            roll.forward[a] = b; roll.forward[b] = a;
            roll.backward[a] = b; roll.backward[b] = a;
        }
        this.inverters.push(roll);
    }

    this.setup = function(key) {
        this.activeRolls = [];
        this.activeRollsIndices = [];
        this.board = [];
        for (let i = 1; i < 27; ++i) { this.board[i] = i; }
        this.activeInverter = null;

        const parts = key.split(';');
        let last_index = parts.length - 1;
        if (last_index >= 0 && parts[last_index].indexOf(' ') > 0) {
            let pairs = parts[last_index].split(' ');
            for (let i = 0; i < pairs.length; ++i) {
                const a = pairs[i].charCodeAt(0) - "A".charCodeAt(0);
                const b = pairs[i].charCodeAt(1) - "A".charCodeAt(0);
                this.board[a] = b; this.board[b] = a;
            }
            --last_index;
        }
        if (last_index >= 0 && parts[last_index].indexOf('=') <= 0) {
            this.activeInverter = this.inverters[parseInt(parts[last_index])];
            --last_index;

        }
        for (let i = 0; i <= last_index; ++i) {
            const configs = parts[i].split('=');
            if (configs.length === 2) {
                this.activeRolls.push(this.rolls[parseInt(configs[0])]);
                this.activeRollsIndices.push(configs[1].charCodeAt(0) - "A".charCodeAt(0));
            }
        }
    };

    function logPair(prefix, a, b) {
        console.log(prefix + ' ' + String.fromCharCode(a + "A".charCodeAt(0)) + " -> " + String.fromCharCode(b + "A".charCodeAt(0)));
        return b;
    }
    function resolveForward(roll, val, offset) {
        const shift = logPair('forward shift by ' + offset, val, (val + offset) % 26);
        const mapped = logPair('forward mapped ', shift, roll.forward[shift]);
        return logPair('forward unshift', mapped, (mapped + 26 - offset) % 26);
    }

    function resolveBackward(roll, val, offset) {
        return logPair('backward', val, (roll.backward[(val + 26 - offset) % 26] + offset) % 26);
    }

    this.encrypt = function (val) {
        if (val < 0) { return val; }
        for (let i = 0; i < this.activeRolls.length; ++i) {
            this.activeRollsIndices[i] = (this.activeRollsIndices[i] + 1) % 26;
            if (this.activeRollsIndices[i] !== 0) { break; }
        }
        val = logPair('board', val, this.board[val]);
        for (let i = this.activeRolls.length - 1; i >= 0; --i) {
            val = resolveForward(this.activeRolls[i], val, this.activeRollsIndices[i]);
        }
        if (this.activeInverter) {
            val = logPair('reflect', val, this.activeInverter.forward[val]);
        }
        for (let i = 0; i < this.activeRolls.length; ++i) {
            val = resolveBackward(this.activeRolls[i], val, this.activeRollsIndices[i]);
        }
        val = logPair('unboard', val, this.board[val]);
        return val;
    };
    this.decrypt = function (val, idx, key) {
        return this.encrypt(val, idx, key);
    };
}
Enigma.prototype = new Vigenere();
algo = new Enigma();