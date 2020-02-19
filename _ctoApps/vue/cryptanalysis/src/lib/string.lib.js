export default function StringLib() {
  /*
   @author D.Kuche
   @date 05.12.2016
   @return bool
   */
  this.hasStringEqualChars = function(str1, str2) {
    if (str1.length !== str2.length) { return false; }

    for (var k = 0; k < str1.length; k++) {
      var char = str1.charAt(k);
      if (str2.indexOf(char) < 0) {
        return false;
      }
    }
    return true;
  };

  this.reverse = function(key) {
    var abc = '';
    if (key.length !== 0) {
      abc = key.split('').reverse().join('');
    }
    return abc;
  };

  /*
   ** check is not uppercase or lowercase
   ** @params myString:string
   ** @return boolean
   */
  this.isNormalCase = function(myString) {
    // the case: both can't be true
    if (this.isUpperCase(myString) || this.isLowerCase(myString)) {
      return false;
    }
    return true;
  };

  this.isUpperCase = function(myString) {
    return (myString === myString.toUpperCase());
  };

  this.isLowerCase = function(myString) {
    return (myString === myString.toLowerCase());
  };

  this.hasTextBlanks = function(text) {
    return text.indexOf(' ') >= 0;
  };

  this.hasTextUmlauts = function(text) {
    let umlauts = ['Ä','ä','Ü','ü','Ö','ö','ß'];
    for (let umlaut of umlauts) {
      if (text.indexOf(umlaut) > -1) {
        return true;
      }
    }
    return false;
  };

  this.hasTextPunctuation = function(text) {
    let marks = ['.',',',':',';','!','?','(',')'];
    for (let mark of marks) {
      if (text.indexOf(mark) > -1) {
        return true;
      }
    }
    return false;
  };

  this.hasTextSpecialChars = function(text) {
    let keys = ['§','$','&','@','|','€','_'];
    for (let key of keys) {
      if (text.indexOf(key) > -1) {
        return true;
      }
    }
    return false;
  };

  this.hasText = function(text, arrayOfChars = []) {
    if (arrayOfChars.length < 0) { return false; }

    for (let key of arrayOfChars) {
      if (text.indexOf(key) > -1) {
        return true;
      }
    }
    return false;
  };

  this.hasTextMathChars = function(text) {
    let keys = ['%','<','>','+','-','=','*','/','%','~','{','}','[',']'];
    for (let key of keys) {
      if (text.indexOf(key) > -1) {
        return true;
      }
    }
    return false;
  };

  this.hasTextNumbers = function(text, relCount) {
    let keys = ['0','1','2','3','4','5','6','7','8','9'];
    let count = 0;
    for (let k = 0; k < text.length; k++) {
      if (keys.indexOf(text[k]) > -1) {
        count++;
      }
      if ((count/text.length) * 100 >= relCount) {
        return true;
      }
    }
    return false;
  };
}
