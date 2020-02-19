import StringLib from "../lib/string.lib";
import KeyObject from "./key.object";

export default function Entropy() {
  var strLib = new StringLib();
  var alphabet = '';

  this.analyseText = function(cipherText) {
    if (strLib.isLowerCase(cipherText)) {
      alphabet = "abcdefghijklmnopqrstuvwxyz";
    } else if (strLib.isUpperCase(cipherText)) {
      alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else {
      alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      // slavic alphabet, also used for russian lang
      alphabet += "АаБбВвГгҐґЃѓДдЂђЕеЀѐЁёЄєЖжЗзЅѕИиЍѝІіЇїЙйЈјКкЌќЛлЉљМмНнЊњОоПпРрСсТтЋћУуЎўФфХхЦцЧчЏџШшЩщЪъЫыЬьЭэЮюЯя";
    }

    if (strLib.hasTextNumbers(cipherText, 7)) {
      alphabet += "0123456789";
    }
    if (!strLib.hasTextBlanks(cipherText)) {
      //alphabet += " ";
    }
    if (strLib.hasTextPunctuation(cipherText)) {
      if (cipherText.indexOf('.') !== cipherText.length-1) {
        alphabet += '.,:;!?()';
      }
    }
    if (strLib.hasTextUmlauts(cipherText)) {
      //alphabet += 'äöüßÄÖÜ';
    }
  };

  this.analyse = function(cipherText, alpha = null) {
    alphabet = alpha;
    if (alpha === null) {
      this.analyseText(cipherText);
      alpha = alphabet;
    }

    let arrayObj = [];
    for (let k = 0; k < alpha.length; k++) {
      let obj = new KeyObject();
      obj.key = alpha[k];
      for (let l = 0; l < cipherText.length; l++) {
        if (alpha[k] == cipherText[l]) {
          obj.absolute += 1;
        }
      }
      obj.calculateAbsEpy();
      arrayObj.push(obj);
    }

    let calcValue = 0;
    arrayObj.forEach(function (val) {
      calcValue += val.calc;
    });

    return calcValue;
  };

}
