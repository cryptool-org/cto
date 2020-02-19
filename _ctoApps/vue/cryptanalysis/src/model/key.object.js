export default function KeyObject() {
  this.key = '';
  this.keyValue = 0;
  this.absolute = 0;
  this.relative = 0.0;
  this.calc = 0.0;
  this.entropy = 0.0;
  this.norm = 0; //should < 0,7

  this.calculateAbsEpy = function() {
    if (this.absolute !== 0) {
      this.calc = this.absolute * Math.log2(this.absolute);
      //this.calc.toFixed(3);
    }
    //console.log(this.calc);
  };

  this.calcEntropy = function(text) {
    if (this.absolute !== 0) {
      this.relative = this.absolute / text.length;
      this.entropy = -1 * (this.relative * Math.log2(this.relative));
      this.calcEntropyNorm(text);
    }
    console.log(this.entropy);
  };

  this.calcEntropyNorm = function (text) {
    if (this.entropy !== 0.0) {
      this.norm = this.entropy / Math.log2(text.length);
    }
  };

  this.calculate = function(triGramObj, rel) {
    if (triGramObj.key.indexOf(this.key) > -1) {
      this.calc = this.relative * rel * 3;
    } else {
      this.calc = this.relative * rel;
    }
    //console.log(this.calc);
  };

  this.setKeyValue = function(value) {
    if (typeof value !== 'number') { return false; }

    this.keyValue = -value;
    if (this.keyValue < 0) {
      this.keyValue = -this.keyValue;
    }
    return true;
  }

};
