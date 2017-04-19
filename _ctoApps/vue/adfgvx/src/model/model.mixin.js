import CTOLibService from "../lib/ctolib.service";
import CTOAdfgvx from "./cto.adfgvx.algorithm";

var ModelMixin = {
    data() {
      return {
        ctolib: new CTOLibService(),
        cryptoclass: new CTOAdfgvx(this.alphabet),
      }
    },
    methods: {
        //generates random keysquare for substitution
        //@author Christian Sieche
        //@version 30.12.2008
        //@params:
        genRandomKeysquare: function() {
          var randKey = this.ctolib.genRandKey(this.allowedKeys);
          this.updateKeysquare(randKey);
          this.crypt(false);
        },
        //generates standard keysquare for substitution
        //@author Christian Sieche
        //@version 30.12.2008
        //@params:
        genStandardKeysquare: function () {
            this.updateKeysquare(this.allowedKeys);
            this.crypt(false);
        },
        //generates custom keysquare for substitution
        //@author Christian Sieche
        //@version 30.12.2008
        //@params:
        genMyKeysquare: function(nocrypt) {
            var keysquare = this.mymatrix;
            var result = false;
            //check if character is allowed
            keysquare = keysquare.toUpperCase();
            keysquare = this.ctolib.cleanInputString(keysquare, this.allowedKeys, false);
            //check if the key got 36 characters
            if (keysquare.length < this.allowedKeys.length) {
              this.warningLength = true;
            } else {
              //check if all character are used unique
              result = this.ctolib.uniqueTest(keysquare, this.allowedKeys);
              this.warningLength = false;
            }
            //output
            if (result == true) {
                this.updateKeysquare(keysquare);
                if (nocrypt!=true) this.crypt(false);
            } else {
                //document.getElementById('mymatrix').className = 'ctoformcss-invalid-style ctoformcss-adfgvx-matrix-input-size';
                if (this.code == 'encode') {
                    this.codtxt = "";
                    this.substitutiontxt = "";
                } else {
                    this.orgtxt = "";
                    this.substitutiontxt = "";
                }
            }
            this.mymatrix = keysquare;
        },
        //returns keysquare or false if keysquare is invalid
        //@author Christian Sieche
        //@version 30.12.2008
        //@params:
        // this is a ugly function
        getKeysquare: function() {
            var keysquare = this.mymatrix;
            //check if character is allowed
            keysquare = keysquare.toUpperCase();
            keysquare = this.ctolib.cleanInputString(keysquare, this.allowedKeys, false);
            //check if the key got 36 characters
            if (keysquare.length < this.allowedKeys.length) return (false);
            //check if all character are used unique
            if (this.ctolib.uniqueTest(keysquare, this.allowedKeys)==false) return(false);
            //output
            this.updateKeysquare(keysquare);
            //document.getElementById('mymatrix').className = 'ctoformcss-txtinput-style ctoformcss-adfgvx-matrix-input-size';
            //this.mymatrix = keysquare;
            return keysquare;
        },
        //generates/formates keysquare for substitution
        //@author Christian Sieche
        //@version 30.12.2008
        //@params: keysquare (string)
        // generate keysquare for substitution
        updateKeysquare: function(keysquare) {
            this.mymatrix = keysquare;
            this.genKeySquare = keysquare;
        },
      ownOption: function() {
        this.own = !this.own;
        this.crypt(false);
      },
      setGroupType: function(type) {
        if (this.groupType === type) { return false; }

        if (typeof this.groupType === 'number') {
          console.log('number');
          this.groupType = type;
          this.crypt(false);

          return true;
        }

        return false;
      },
      formatTextByBlock: function(text, blocks) {
        var tmp = this.ctolib.str_split(text, 500);
        if (blocks === 2) {
          tmp = this.ctolib.str_split(text, 2);
        } else if (blocks === 5) {
          tmp = this.ctolib.str_split(text, 5);
        }
        console.log(tmp);
        return tmp;
      },
      setType: function(type) {
        if (this.cipherType === type) { return false; }
        this.cipherType = type;

        if (this.cipherType === 1) {
          this.matrix = ['A', 'D', 'F', 'G', 'X'];
          this.allowedKeys = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
        } else if (this.cipherType === 2) {
          this.matrix = ['A', 'D', 'F', 'G', 'V', 'X'];
          this.allowedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        }
        this.updateKeysquare(this.allowedKeys);
        this.crypt(false);
        return true;
      },
      setKeywordValue: function() {
        let keyLen = this.firstKeyword.length;
        this.firstKeyword = this.firstKeyword.toUpperCase();
        this.firstKeyword = this.ctolib.makeUnique(this.firstKeyword);
        let alphabet = this.allowedKeys;
        console.log(this.firstKeyword);
        for (let k = 0; k < keyLen; k++) {
          let char = this.firstKeyword[k];
          alphabet = alphabet.replace(char, '');
        }
        var keysquare = this.firstKeyword + alphabet;
        console.log(keysquare);
        this.mymatrix = keysquare;

        this.genMyKeysquare(false);
    },
    //@author Christian Sieche
    //@version 27.12.2008
    //@params: click(int) item which has been clicked.
    // 1=uppercase, 2=blanks, 3=digits, 4=punctuation marks, 5=lowercase, 6=umlauts
    setAlphabet: function(click) {
        // 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
        // 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
        // 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)
        this.toggleAlphabetOptions(click);

        var params = [
          click,
          this.uppercase,
          this.blanks,
          this.digits,
          this.punctuationmarks,
          this.lowercase,
          this.umlauts,
          false,
          this.alphabet
        ];
        console.log(this.alphabet);

        params = this.ctolib.setAlphabet(params);

        this.uppercase = params[1];
        this.blanks = params[2];
        this.digits = params[3];
        this.punctuationmarks = params[4];
        this.lowercase = params[5];
        this.umlauts = params[6];
        this.alphabet = params[8];
        console.log(this.alphabet);

        this.plaintextabc = this.ctolib.niceAlphabetOutput(this.alphabet);
        this.alphaLength = this.alphabet.length;
        this.cryptoclass = new CTOAdfgvx(this.alphabet);
        this.checkKey();
    },
        //@author Christian Sieche
        //@version 26.12.2008
        //@params:
    checkKey: function() {
        let key = this.keyValue;
        if (this.uppercase && !this.lowercase) {
            key = key.toUpperCase();
        } else if (!this.uppercase && this.lowercase) {
            key = key.toLowerCase();
        }
        this.keyValue = this.ctolib.cleanInputString(key, this.alphabet, false);
        this.crypt(false);
    },
        //@author Christian Sieche
        //@version 30.12.2008
        //@params:
        // type = "encode" or "decode"
    crypt: function(type, txt) {
        this.genMyKeysquare(true);

        if (type == "encode") {
            this.code = "encode";
            this.orgtxt = txt;
        }

        if (type == "decode") {
            this.code = "decode";
            this.codtxt = txt;
        }
        //console.log('txt: '+txt);

        //type = this.code;
        console.log('type: ' + type);
        console.log('coding: ' + this.code);

        //start check key
        let allowed = this.alphabet;
        var key = this.ctolib.cleanInputString(this.keyValue, allowed, false);
        //end check key

        var allowedinput = "abcdefghijklmnopqrstuvwxyz0123456789";
        if (this.code === "encode") {
            //document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

            var isInputOK = this.ctolib.inputString(this.orgtxt.toLowerCase(), allowedinput);

            if (isInputOK == false) {
                document.getElementById('orgtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
            }
            else {
                //document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            }

            if (key != "") {
                let keysquare = this.getKeysquare();
                if (keysquare == false) {
                    this.codtxt = "";
                    this.substitutiontxt = "";
                    return;
                }
                let type = this.matrix.toString().replace(/,/g, '');
                let outputsubstitution = this.cryptoclass.encodePartA(this.orgtxt, keysquare, type);
                let tmp = this.formatTextByBlock(outputsubstitution, this.groupTypeSub);
                this.substitutiontxt = tmp.join(" ");

                console.log(key);
              console.log(outputsubstitution);
                // transposition
                let outputarray = this.cryptoclass.encodePartB(outputsubstitution, key);
                let output = outputarray[0];

                tmp = this.formatTextByBlock(output, this.groupType);
                this.codtxt = tmp.join(" ");
                this.columns = outputarray[1];
            } else {
                this.keyValue = key;
                this.codtxt = "";
                this.columns = "";
            }
        }

        if (this.code === "decode") {
            //document.getElementById('orgtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            //if (this.showGroup) { this.showGroup = false; }
            this.groupType = 0;
            var codtext = this.codtxt;
            let keysquare = this.getKeysquare();
            if (keysquare == false) {
                this.orgtxt = "";
                this.substitution = "";
                return;
            }

            //remove blanks and enter
            codtext=codtext.replace(/ /g, "");
            codtext=codtext.replace(/\r/g, "");
            codtext=codtext.replace(/\n/g, "");

            // transposition
            var re = /[^ADFGVXadfgvx]/;
            var error=0; //0=ok, 1=error, 2=ciphertext error, 2=
            if(codtext.length < 1){ error=1; }
            if(re.test(codtext)){ error=2;}
            if(codtext.length % 2 != 0){ error=2; }
            if(key.length <= 1){ error=1; }
            if (error>0) {
                if (error==2) {
                    document.getElementById('codtxt').className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
                }
                //else document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
                this.substitutiontxt = "";
                this.orgtxt = "";
                return;
            }
            //document.getElementById('codtxt').className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
            let outputarray = this.cryptoclass.decodePartA(codtext, keysquare, key);
            let outputsubstitution = outputarray[0];
            let tmp = this.formatTextByBlock(outputsubstitution, this.groupTypeSub);
            tmp = tmp.join(" ");
            this.substitutiontxt = tmp.toUpperCase();
            this.columns = outputarray[1];

            let type = this.matrix.toString().replace(/,/g, '');
            tmp = this.ctolib.str_split(this.cryptoclass.decodePartB(outputsubstitution, keysquare, type), 45);
            this.orgtxt = tmp.join(" ");
        }
    },

  }
};
export default ModelMixin;
