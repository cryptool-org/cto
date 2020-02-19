import KeyObject from "./key.object";

export default function NGram() {
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
