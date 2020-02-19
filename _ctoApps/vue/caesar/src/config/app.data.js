
var AppData = {
    data() {
      return {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", //alphabet to start with
        global_plaintextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        global_ciphertextabc: "BCDEFGHIJKLMNOPQRSTUVWXYZA",

        orgtxt: "The quick brown fox jumps over the lazy dog",
        codtxt: "The quick brown fox jumps over the lazy dog",
        code: 'encode',

        keyValue: 1,
        alphaLength: 26,

        uppercase: true,
        blanks: false,
        digits: false,
        punctuationmarks: false,
        lowercase: false,
        umlauts: false,
        rot13: false,
        casesensitive: false,
        signs: true,
        clean: false,
        ignoreSpaces: false,

        toggle: false,
        own: false,
        warnLength: false,
        warnChars: false,
        warnClash: false,
        clashes: ''
      }
    }
  };
  export default AppData;
