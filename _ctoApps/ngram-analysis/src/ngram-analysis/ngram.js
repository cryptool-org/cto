function KeyObject() {

    this.key = '';
    this.keyValue = 0;
    this.absolute = 0;
    this.relative = 0.0;
    this.calc = 0.0;

    this.calculate = function(triGramObj, rel) {
        if (triGramObj.key.indexOf(this.key) > -1) {
            this.calc = this.relative * rel * 3;
        } else {
            this.calc = this.relative * rel;
        }
    };

    this.setKeyValue = function(value) {
        if (typeof value !== 'number') { return false; }
        this.keyValue = -value;
        if (this.keyValue < 0) {
            this.keyValue = -this.keyValue;
        }
        return true;
    }

}

function NGram() {

    const MONOGRAMS = 0;
    const BIGRAMS = 1;
    const TRIGRAMS = 2;
    const TETRAGRAMS = 3;

    var monoGrams;
    var biGrams;
    var triGrams;
    var tetraGrams;

    this.countMonoGrams = function(text) {
        monoGrams = [];
        text = text.replace(/ /g, '');
        this.computeGrams(monoGrams, text, MONOGRAMS);
        this.fillRelatives(monoGrams, text);

        return monoGrams;
    };

    this.countBiGrams = function(text) {
        biGrams = [];

        text = text.replace(/ /g, '');
        this.computeGrams(biGrams, text, BIGRAMS);
        this.fillRelatives(biGrams, text);

        return biGrams;
    };

    this.countTriGrams = function(text) {
        triGrams = [];

        text = text.replace(/ /g, '');
        this.computeGrams(triGrams, text, TRIGRAMS);
        this.fillRelatives(triGrams, text);

        return triGrams;
    };

    this.countTetraGrams = function(text) {
        tetraGrams = [];

        text = text.replace(/ /g, '');
        this.computeGrams(tetraGrams, text, TETRAGRAMS);
        this.fillRelatives(tetraGrams, text);

        return tetraGrams;
    };

    this.countNGrams = function(text, gramNumber) {
        text = text.replace(/ /g, '');
        let nGrams = this.computeGrams([], text, gramNumber);
        this.fillRelatives(nGrams, text);

        return nGrams;
    };

    this.computeGrams = function(array, text, gramNumber) {
        //text = text.toUpperCase();
        for(let k = 0; k < text.length-gramNumber; k++) {
            let tmp = text.substring(k, k+gramNumber+1);
            let obj = new KeyObject();
            obj.key = tmp;
            if (arrayAddObject(array, obj)) {
                for(let l = 0; l < text.length-gramNumber; l++) {
                    let next = text.substring(l, l+gramNumber+1);
                    if (obj.key === next) {
                        obj.absolute++;
                    }
                }
            }
        }
        return sortArray(array);
    };

    //toFixed(3)
    //toPrecision(4)

    this.fillRelatives = function(array, text) {
        for(let k = 0; k < array.length; k++) {
            array[k].relative = this.computeRelative(array[k].absolute, text.length);
        }
        let obj = new KeyObject();
        obj.key = 'Sum'; obj.absolute = this.sumChars(text);
        array.push(obj);
    };

    /*
    @param array with objects
    @param obj must have a key
    @return boolean
    */
    function arrayAddObject(array, obj) {
        if (typeof obj.key === 'undefined') { return false; }

        for(let k = 0; k < array.length; k++) {
            if (array[k].key === obj.key) {
                return false;
            }
        }

        array.push(obj);
        return true;
    }

    this.computeRelative = function(sumChar, sumText) {
        if (sumText === 0) { sumText = 1; }
        return (sumChar / sumText) * 100;
    };

    this.sumChars = function(text) {
        return text.length;
    };

    function sortArray(array) {
        array.sort(function(a, b) {
            return b.absolute - a.absolute;
        });
        return array;
    }

}

function createTables(arr) {

    let res = '<hr class="mx-3">';
    res += '<h4 class="col-12 font-weight-bold">${{ ngram.tables_heading_overall }}$</h4>';

    for (let i = 0; i < arr.length; i++) {

        let tableArr = arr[i];

        res += '<div class="table-responsive col-lg-6 pt-3">';
        res += '<table class="table table-sm table-bordered table-hover text-center">';

        res += '<thead class="thead-dark"><tr>';
        res += '    <th scope="col">${{ ngram.table_heading_rank }}$</th>';
        res += '    <th scope="col">' + (i+1) + '${{ ngram.table_heading_gram }}$</th>';
        res += '    <th scope="col">${{ ngram.table_heading_absolute }}$</th>';
        res += '    <th scope="col">${{ ngram.table_heading_relative }}$</th>';
        res += '</tr></thead>';

        res += '<tbody>';

        for (let j = 0; j < tableArr.length - 1; j++) { // -1 cuz last item contains total sum

            let rowObj = tableArr[j];

            res += '<tr>';
            res += '    <td>' + (j+1) + '</td>';
            res += '    <td>' + rowObj.key + '</td>';
            res += '    <td>' + rowObj.absolute + '</td>';
            res += '    <td>' + rowObj.relative.toFixed(3) + '</td>';
            res += '</tr>';

        }

        res += '</tbody>';
        res += '</table></div>';

    }

    $("#matrix").html(res);

}

function compute() {

    let caseSensitive = $("#case-sensitive-checkbox").is(":checked");

    let txt = $("#ciphertext").val().trim();
    if (!caseSensitive) txt = txt.toUpperCase();

    let countGrams = $("#ngram-amount-input").val();
    let tableLength = $("#table-length-input").val();
    
    let arr = [];
    for (let k = 0; k < countGrams; k++) {
        arr[k] = nGram.countNGrams(txt, k);
    }

    tableLength++;
    for (let k = 0; k < arr.length; k++) {
        arr[k] = arr[k].slice(0, tableLength);
    }

    /*
    arr[0] = nGram.countMonoGrams(txt);
    arr[1] = nGram.countBiGrams(txt);
    arr[2] = nGram.countTriGrams(txt);
    arr[3] = nGram.countTetraGrams(txt);
    */

   createTables(arr);

}

let keyObject = new KeyObject();
let nGram = new NGram();

let hasBeenAnalyzedOnce = false;
$("#analyze-button").click(function() { compute(); 
    if(!hasBeenAnalyzedOnce) { // add change listeners only once
        $(".cryptool-container textarea").on("input", compute);
        $(".cryptool-container input").change(compute);
    } hasBeenAnalyzedOnce = true;
});