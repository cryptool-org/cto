var AppData = {
    data() {
      return {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", //alphabet to start with
        shiftAlpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        global_plaintextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        global_ciphertextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        plaintextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        ciphertextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

        orgtxt: "The quick brown fox jumps over the lazy dog",
        codtxt: "The quick brown fox jumps over the lazy dog",
        code: 'encode',

        cType: 2,
        firstKeyword: '',
        secondKeyword: '',

        keyValue: 1,
        alphaLength: 26,

        uppercase: true,
        blanks: false,
        digits: false,
        punctuationmarks: false,
        lowercase: true,
        umlauts: false,
        casesensitive: false,
        signs: true,
        clean: false,
        showGroup: false,
        ignoreSpaces: false,

        show: false,
        toggle: false,
        own: false,
        warningLength: false,
        warningClash: false,
        clashes: ''
      }
    }
  };
  export default AppData;
