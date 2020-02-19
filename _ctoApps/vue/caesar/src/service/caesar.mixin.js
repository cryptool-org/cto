import CTOLibService from "./ctolib.service";
import CaesarAlgorithm from "./caesar.algorithm";
import AppData from "../config/app.data";
import ToggleMixin from "./toggle.mixin";

var CaesarMixin = {
    mixins: [AppData, ToggleMixin],
    data() {
      return {
        cryptoClass: new CaesarAlgorithm("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
        ctolib: new CTOLibService(),
      }
    },
    methods: {
      toggleOptions: function(expression) {
        this.toggleDisplayOptions(expression);
        this.caesarCrypt(false);
      },
      setOwnAlphabet: function(bool, textabc) {
        if (bool) {
          this.global_plaintextabc = this.ctolib.makeUnique(textabc);
        } else {
          this.global_ciphertextabc = this.ctolib.makeUnique(textabc);
        }
        if (this.ctolib.isNormalCase(this.global_plaintextabc) || this.ctolib.isNormalCase(this.global_ciphertextabc)) {
          this.uppercase = true; this.lowercase = true;
        } else if (this.ctolib.isUpperCase(this.global_plaintextabc) || this.ctolib.isUpperCase(this.global_ciphertextabc)) {
          this.uppercase = true; this.lowercase = false;
        } else {
          this.uppercase = false; this.lowercase = true;
        }

        this.global_ciphertextabc = this.global_plaintextabc;
        this.alphabet = this.global_plaintextabc;
        /*
        this.alphaLength = this.global_plaintextabc.length;
        this.alpciLength = this.global_ciphertextabc.length;
        if (this.alphaLength !== this.alpciLength) {
          this.warnLength = true;
        } else {
          this.warnLength = false;
        }
        if (!this.ctolib.hasStringEqualChars(this.global_plaintextabc, this.global_ciphertextabc)) {
          this.warnChars = true;
        } else {
          this.warnChars = false;
        }
        */
        this.parseAlphabet();
        this.caesarCrypt(false);
      },
      ownOption: function() {
        this.own = !this.own;
        this.caesarCrypt(false);
      },

    //@author Christian Sieche
    //@version 27.12.2008
    //@params: click(int) item which has been clicked. 1=uppercase, 2=blanks, 3=digits,
    //                                                 4=punctuation marks, 5=lowercase, 6=umlauts
    setAlphabet: function(click) {
        // 0=click(int), 1=uppercase(boolean), 2=blanks(boolean),
        // 3=digits(boolean), 4=punctuation marks(boolean), 5=lowercase(boolean),
        // 6=umlauts(boolean), 7=rot-13(boolean), 8=alphabet(string)
        this.toggleAlphabetOptions(click);

        //ROT-13
        if (click==7 && this.rot13) {
          if (this.alphaLength % 2 !== 0) {
            this.keyValue = 13 ;
          } else {
            this.keyValue = this.alphaLength / 2;
          }
        }
        //ROT-13

        var params = [
            click,
						this.uppercase,
						this.blanks,
						this.digits,
						this.punctuationmarks,
						this.lowercase,
						this.umlauts,
						this.rot13,
            this.alphabet
        ];

        params = this.ctolib.setAlphabet(params);

        this.uppercase = params[1];
    		this.blanks = params[2];
    		this.digits = params[3];
    		this.punctuationmarks = params[4];
    		this.lowercase = params[5];
    		this.umlauts = params[6];
    		this.rot13 = params[7];
        this.alphabet = params[8];

        this.global_plaintextabc = this.alphabet;
        this.alphaLength = this.alphabet.length;
        this.parseAlphabet();
        this.cryptoClass = new CaesarAlgorithm(this.alphabet);
        this.caesarCrypt(false);
    },

    //if a key is pressed highlight the key in the shown alphabet
    //@author Christian Sieche
    //@version 23.12.2008
    //@params: key(int) (char code of key)
    //         type (string)  "encode" or "decode"
    keyPress: function(key, type) {
        if (key != 15) {
            var plaintextalphabet= this.global_plaintextabc;
            var ciphertextalphabet= this.global_ciphertextabc;
            var char = String.fromCharCode(key);

            //upper / lower-case check
      	   	var up = this.uppercase;
      	   	var lo = this.lowercase;
      	   	var sen = this.casesensitive;
            if(!sen && ((up && !lo) || (!up && lo))) {
                if (up) char = char.toUpperCase();
                else char = char.toLowerCase();
            }

            if (type=="encode") {
                //plaintextalphabet = plaintextalphabet.replace(char, "<span" +
                //   " class=\"ctoformcss-alphabethighlight-style\">"+char+"</span>");
                var cipherchar= this.cryptoClass.crypt(this.keyValue, char, "encrypt", "ignore");
                //ciphertextalphabet = ciphertextalphabet.replace(cipherchar, "<span" +
                //    " class=\"ctoformcss-alphabethighlight-style\">"+cipherchar+"</span>");
            }
            else {
                //ciphertextalphabet = ciphertextalphabet.replace(char, "<span" +
                //    " class=\"ctoformcss-alphabethighlight-style\">"+char+"</span>");
                var plainchar = this.cryptoClass.crypt(this.keyValue, char, "decrypt", "ignore");
                //plaintextalphabet = plaintextalphabet.replace(plainchar, "<span" +
                 //   " class=\"ctoformcss-alphabethighlight-style\">"+plainchar+"</span>");
            }
            this.global_plaintextabc = plaintextalphabet;
            this.global_ciphertextabc = ciphertextalphabet;
        }
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    checkKey: function(nocrypt) {
        var valid = "0123456789";

        let key = this.ctolib.cleanInputString(this.keyValue.toString(),valid, true);

        if (key != "") {
            key = parseInt(key);

            if (key < 0) { key = 0; }

            if (key > this.alphabet.length - 1) {
                key = this.alphabet.length - 1;
            }
            this.keyValue = key;
            if (nocrypt!=true) this.parseAlphabet();
        }
        else {
            this.keyValue = 0;
            this.parseAlphabet();
        }
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    increaseKey: function() {
        this.keyValue = this.ctolib.increaseKey(this.keyValue, this.alphabet);
        this.parseAlphabet();
    },


    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    decreaseKey: function() {
        this.keyValue = this.ctolib.decreaseKey(this.keyValue, this.alphabet);
        this.parseAlphabet();
    },

    //parses the alphabet to the key
    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    parseAlphabet: function() {
        /*var key = document.getElementById("key").value;

        if (key == "")
            key = 0;
        key = parseInt(key);*/
        var out1 = '';
        var out2 = '';
        var alphaLen = this.alphabet.length;

        if (this.keyValue > alphaLen) {
            let key = alphaLen-1;
            if (key < 0) { key = 0; }
            this.keyValue = key;
        }

        for (let i = 0; i < alphaLen; i++) {
            out1 = out1 + this.alphabet.charAt(i);
        }
        for (let i = 0; i < alphaLen; i++) {
            out2 = out2 + this.alphabet.charAt((i + this.keyValue) % alphaLen);
        }
        this.global_plaintextabc = out1;
        this.global_ciphertextabc = out2;

        console.log('is' + this.ctolib.isValid(out1, out2));
        if (!this.ctolib.isValid(out1, out2)) {
          this.warnClash = true;
          this.clashes = this.ctolib.getClash(out1, out2).toString();
        } else {
          this.warnClash = false;
        }

        if (this.keyValue != 13) {
            this.rot13 = false;
        }
        this.alphaLength = alphaLen;
        this.caesarCrypt(false);
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    // type = "encode" or "decode" (string)
    caesarCrypt: function(type, txt) {
        //set value to radiogroup
        if (type == "encode") {
          this.code = "encode";
          this.orgtxt = txt;
        }

        if (type == "decode") {
          this.code = "decode";
          this.codtxt = txt;
        }

        //type = this.code;
        console.log(type);
        console.log(this.code);

        if (!this.own) {
          this.checkKey(true);
        }

        if (this.code == "encode") {
            let output = this.getOutput(this.own, this.orgtxt);

            if ( this.ignoreSpaces) {
                output = output.replace(/ /g, "");
            }
            if ( this.clean ) {
                output = output.replace(/ /g, "");
                var tmp = this.ctolib.str_split(output, 5);
                output = tmp.join(" ");
            }
            this.codtxt = output;
        }

        if (this.code == "decode") {
            let output = this.getOutput(this.own, this.codtxt, 'decrypt');
            this.orgtxt = output;
        }
    },

    getOutput: function(mono = false, text, crypt = 'encrypt') {
        if ( !this.casesensitive ) {
            if ( this.uppercase && !this.lowercase ) {
                text = text.toUpperCase();
            }
            if ( !this.uppercase && this.lowercase  ) {
                text = text.toLowerCase();
            }
        }

        var output;
        if ( this.signs ) {
          if (mono) {
            output = this.cryptoClass.monocrypt(this.global_plaintextabc, this.global_ciphertextabc, this.casesensitive, text, crypt, "ignore");
          } else {
            output = this.cryptoClass.crypt(this.keyValue, text, crypt, "ignore");
          }
        } else {
          if (mono) {
            output = this.cryptoClass.monocrypt(this.global_plaintextabc, this.global_ciphertextabc, this.casesensitive, text, crypt, "straight");
          } else {
            output = this.cryptoClass.crypt(this.keyValue, text, crypt, "remove");
          }
        }
        return output;
    }
  }
};
export default CaesarMixin;
