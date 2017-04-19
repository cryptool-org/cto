var AppData = {
    data() {
      return {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", //alphabet to start with
        allowedKeys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        plaintextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ciphertextabc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        orgtxt: "The quick brown fox jumps over the lazy dog",
        codtxt: "The quick brown fox jumps over the lazy dog",
        code: 'encode',
        substitutiontxt: '',
        columns: '',
        matrix: ['A','D','F','G','V','X'],
        mymatrix: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        genKeySquare: '',
        firstKeyword: '',
        secondKeyword: '',

        keyValue: 'CODE',
        alphaLength: 26,

        uppercase: true,
        blanks: false,
        digits: true,
        punctuationmarks: false,
        lowercase: false,
        umlauts: false,
        casesensitive: false,
        signs: true,
        clean: false,
        showGroup: true,
        substitutionGroup: true,
        ignoreSpaces: false,

        show: false,
        toggle: false,
        own: false,
        warningLength: false,
      }
    }
  };
  export default AppData;
