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

function Huffman() {
    var codes={};
    var tree = null;

    this.padStringWithLeadingZeros = function(_string, _length) {
        var string = _string;
        while(string.length < _length) {
            string = "0" + string;
        }
        return string;
    };

    this.frequency = function (str){
        var freqs={};
        for (var i in str){
            if(freqs[str[i]]==undefined){
                freqs[str[i]]=1;
            }
            else {
                freqs[str[i]]=freqs[str[i]]+1;
            }
        }

        return freqs;
    };

	const tuple_cmp_ns = (a,b) => {
		if (a[0] != b[0]) {
			return a[0] - b[0];
		}
		return a[1].localeCompare(b[1]);
	};
	const tuple_cmp_nn = (a,b) => {
		if (a[0] != b[0]) {
			return a[0] - b[0];
		}
		return a[1] - b[1]
	};
    this.sortfreq = function (freqs){
        var letters = [];
        for (var ch in freqs){
            letters.push([freqs[ch],ch]);
        }
        return letters.sort(tuple_cmp_ns);
    };

    this.buildtree = function (tuples){
        while(tuples.length>1){
            var leasttwo=[tuples[0][1],tuples[1][1]];
            var rest=tuples.slice(2,tuples.length);
            var combfreq=tuples[0][0]+tuples[1][0];
            tuples=rest;
            var end=[combfreq,leasttwo];
            tuples.push(end)
            tuples.sort(tuple_cmp_nn);
        }
        return tuples;
    };

    this.trimtree = function (tuples){
        return tuples[0][1];
    };

    this.assigncodes = function (node,pat){
        pat=pat || "";
        if (typeof node==typeof ""){
            codes[node]=pat;
        }
        else{

            this.assigncodes(node[0],pat+"0");
            this.assigncodes(node[1],pat+"1");
        }
    };

    this.encode = function (str){
        var output="";
        for(var ch in str){
            output=output+codes[str[ch]];
        }
        return output
    };

    this.decode = function (tree,str){
        var output="";
        var p=tree;
        for (var bit in str){

            if (str[bit]==0){
                p=p[0]
            }
            else{
                p=p[1]
            }
            if (typeof p ==typeof ""){
                output=output+p
                p=tree
            }
        }
        return output

    };

    this.encode_ascii = function (input) {
        var output = "";
        for(var i=0; i<input.length; i++) {
            if(output.length > 0) {
                output += " ";
            }
            output += this.padStringWithLeadingZeros((input.charCodeAt(i) >>> 0).toString(2), 8);
        }
        return output;
    };

    this.decode_ascii = function (input) {
        var output = "";
        input = input.replace(/[^0-1]+/g, "");
        while(input.length >= 8) {
            var integerString = input.substr(0, 8);
            var integerDecimal = parseInt(integerString, 2).toString(10);
            output += String.fromCharCode(integerDecimal);
            input = input.substr(8, input.length - 8);
        }
        return output;
    };

    // https://gist.github.com/ppseprus/afab8500dec6394c401734cb6922d220
    this.getFrequencies = function (str) {
        let dict = new Set(str);
        return [...dict].map(chr => {
            return str.match(new RegExp(chr, 'g')).length;
        });
    };

    this.get_relative_frequencies = function (str, freq){
        var result = [];
        var val_l = str.length;
        for(var i=0; i<freq.length; i++) {
            result.push(freq[i] / val_l);
        }
        return result;
    };

    this.code_length_huff = function (str){
        var result = 0;
        var freq = this.getFrequencies(str);
        var rel_freq = this.get_relative_frequencies(str, freq);

        var arr = Object.entries(codes);
        for(var i=0; i<arr.length; i++) {
            result = result + (rel_freq[i] * arr[i][1].length);
        }
        return result;
    };

    this.code_length_ascii = function (str){
        var result = 0;
        var freq = this.getFrequencies(str);
        var rel_freq = this.get_relative_frequencies(str, freq);
        for(var i=0; i<freq.length; i++) {
            result = result + (rel_freq[i] * 8);
        }
        return result;
    };

    this.calculate_entropy = function (str) {
        var freq = this.getFrequencies(str);
        return freq.reduce((sum, frequency) => {
            let p = frequency / str.length;
            return sum - (p * Math.log(p) / Math.log(2));
        }, 0);
    };


    this.build_table = function(input, huff_code) {
        var entropy_huff = this.calculate_entropy(input);
        var huff_length = this.code_length_huff(input);
        var ascii_length = this.code_length_ascii(input);

        var my_values = [...new Set(input)];
        var freq = this.getFrequencies(input);

        var table_body = "";
        for(var i=0; i<my_values.length; i++) {
            table_body = table_body + '<tr>' +
                '<td>' + i.toString() + '</td>' +
                '<td>' + my_values[i] + '</td>' +
                '<td>' + my_values[i].charCodeAt(0) + '</td>' +
                '<td>' + freq[i] + '</td>' +
                '<td>' + this.encode(my_values[i]) + '</td>' +
                '<td>' + this.encode_ascii(my_values[i]) + '</td>' +
                '</tr>'
        }

        return '<table border="0"><tbody><tr><td><h2>${{ huffman.RESULT }}$</h2><br><b>' +
            '${{ huffman.STORAGESIZE }}$:</b><blockquote>' +
            'ASCII: ' + ((input.length) * 8).toString() + ' bit<br>' +
            'Huffman: ' + (huff_code.length).toString() + ' bit<br></blockquote><b>' +
            '${{ huffman.ENTROPY }}$:</b><blockquote>' +
            'ASCII: ' + entropy_huff.toString() +'<br>' +
            'Huffman: ' + entropy_huff.toString() +'<br></blockquote><b>' +
            '${{ huffman.CODELENGTH }}$:</b><blockquote>' +
            'ASCII: ' + ascii_length.toString() + ' bit<br>' +
            'Huffman: ' + huff_length.toString() + ' bit<br></blockquote><b>' +
            '${{ huffman.COMPRESSION }}$:</b> ' + (huff_length/8).toString() + '<br><br>' +
            '<table cellspacing="0" cellpadding="4" border="1"><tbody><tr><td><b>&nbsp;${{ huffman.NUMBER }}$&nbsp;</b></td><td><b>&nbsp;${{ huffman.SIGN }}$&nbsp;</b></td><td><b>&nbsp;ASCII&nbsp;</b></td><td><b>&nbsp;${{ huffman.FREQUENCY }}$&nbsp;</b></td><td><b>&nbsp;HUFFMAN&nbsp;</b></td><td><b>&nbsp;ASCII&nbsp;</b></td></tr>' +
            table_body +
            '</tbody></table></td></tr></tbody></table>' +
            '<br>';
    };

    this.encrypt = function (alphabets, input) {
        if (input.length > 1){
            var freq = this.frequency(input, tree);
			console.log('freq:', this.sortfreq(freq));
            tree= this.trimtree(this.buildtree(this.sortfreq(freq)));
            this.assigncodes(tree);
            var result = this.encode(input);

            // set ascii encoded text
            document.getElementById("ascii_encode").value = this.encode_ascii(input);
            document.getElementById("calculated").innerHTML = this.build_table(input, result);
            codes = {};
            return result;
        }
        else{
            document.getElementById("ascii_encode").value = '';
            document.getElementById("calculated").innerHTML = '';
            return "";
        }
    };

    this.decrypt = function (alphabets, input) {
        return this.decode(tree, input);
    };
}

let algo = new Huffman();


describe('Huffman', () => {
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
