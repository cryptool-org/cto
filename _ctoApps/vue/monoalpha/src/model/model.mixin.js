import CTOLibService from "../lib/ctolib.service";
import CTOMono from "./cto.mono.algorithm";

var ModelMixin = {
    data() {
      return {
        ctolib: new CTOLibService(),
      }
    },
    methods: {
      isAlphabetLengthEqual() {
        return this.global_plaintextabc.length === this.global_ciphertextabc.length;
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

        this.warningLength = !this.isAlphabetLengthEqual();

        //setPlainAlphabet(global_plaintextabc);
        //setCipherAlphabet(global_ciphertextabc);

        this.shiftAlpha = this.global_ciphertextabc;

        //this.global_ciphertextabc = this.global_plaintextabc;
        //this.alphabet = this.global_plaintextabc;
        //this.shiftAlphabet();
        this.crypt(false);
      },
      ownOption: function() {
        if (!this.isAlphabetLengthEqual()) {
            this.warningLength = true;
            return;
        }
        this.own = !this.own;
        this.crypt(false);
      },
      shiftAlphabet: function(alphabet = this.shiftAlpha) {
        var alphaLen = alphabet.length;

        if (this.keyValue > alphaLen) {
            let key = alphaLen-1;
            if (key < 0) { key = 0; }
            this.keyValue = key;
        }
        //this.global_plaintextabc = alphabet;
        this.global_ciphertextabc = alphabet.substr(this.keyValue) + alphabet.substr(0, this.keyValue);

        this.alphaLength = alphaLen;

        if (!this.ctolib.isValid(this.global_plaintextabc, this.global_ciphertextabc)) {
            this.warningClash = true;
            this.clashes = this.ctolib.getClash(this.global_plaintextabc, this.global_ciphertextabc).toString();
        } else {
            this.warningClash = false;
        }
        //this.crypt(false);
      },
      eventAtbash: function() {
        this.shiftAlpha = this.ctolib.reverse(this.shiftAlpha);
        this.shiftAlphabet();
        this.crypt();
      },
      setKeywordValue: function() {
        switch (parseInt(this.cType)) {
            case 1: // K1
                this.global_plaintextabc = CTOMono.getKeyedAlphabet(this.firstKeyword, this.alphabet);
                this.global_ciphertextabc = this.alphabet;
                break;
            case 2: // K2
                this.shiftAlpha = CTOMono.getKeyedAlphabet(this.firstKeyword, this.alphabet);
                this.global_plaintextabc = this.alphabet;
                this.global_ciphertextabc = this.shiftAlpha;
                break;
            case 3: // K3
                this.shiftAlpha = CTOMono.getKeyedAlphabet(this.firstKeyword, this.alphabet);
                this.global_plaintextabc = this.shiftAlpha;
                this.global_ciphertextabc = this.shiftAlpha;
                break;
            case 4: // K4
                this.shiftAlpha = CTOMono.getKeyedAlphabet(this.secondKeyword, this.alphabet);
                this.global_plaintextabc = CTOMono.getKeyedAlphabet(this.firstKeyword, this.alphabet);
                this.global_ciphertextabc = this.shiftAlpha;
        }
        this.shiftAlphabet();
        this.crypt(false);
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

        //ROT-13
        if (click == 7 && this.rot13) {
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
    	//this.rot13 = params[7];
        this.alphabet = params[8];
        console.log(this.alphabet);

        this.global_plaintextabc = this.alphabet;
        this.global_ciphertextabc = this.alphabet;
        this.alphaLength = this.alphabet.length;
        this.shiftAlpha = this.alphabet;
        this.shiftAlphabet(this.alphabet);
        this.crypt(false);
    },

    checkKey: function() {
        var valid = "0123456789";

        let key = this.ctolib.cleanInputString(this.keyValue.toString(),valid, true);

        if (key != "") {
            key = parseInt(key);

            if (key < 0) { key = 0; }

            if (key > this.alphabet.length - 1) {
                key = this.alphabet.length - 1;
            }
            this.keyValue = key;
        } else {
            this.keyValue = 0;
        }
        this.shiftAlphabet();
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    increaseKey: function() {
        this.keyValue = this.ctolib.increaseKey(this.keyValue, this.shiftAlpha);
        this.shiftAlphabet();
        this.crypt(false);
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    decreaseKey: function() {
        this.keyValue = this.ctolib.decreaseKey(this.keyValue, this.shiftAlpha);
        this.shiftAlphabet();
        this.crypt(false);
    },

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    // type = "encode" or "decode" (string)
    crypt: function(type, txt) {
        if (type == "encode") {
          this.code = "encode";
          this.orgtxt = txt;
        }

        if (type == "decode") {
          this.code = "decode";
          this.codtxt = txt;
        }
        console.log('txt: '+txt);

        //type = this.code;
        console.log('type: ' + type);
        console.log('coding: ' + this.code);

        if (!this.own) {
          this.checkKey(true);
        }

        if (this.code == "encode") {
            let output = this.getOutput(this.orgtxt);

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
            this.orgtxt = this.getOutput(this.codtxt, 'decrypt');
        }
    },

    getOutput: function(text, crypt = 'encrypt', mono) {
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
          if (this.mas || mono) {
            output = CTOMono.crypt(this.global_plaintextabc, this.global_ciphertextabc, this.casesensitive, text, crypt, "ignore");
          } else {
            output = CTOMono.caesarCrypt(this.keyValue, text, crypt, "ignore", this.global_plaintextabc);
          }
        } else {
          if (this.mas || mono) {
            output = CTOMono.crypt(this.global_plaintextabc, this.global_ciphertextabc, this.casesensitive, text, crypt, "straight");
          } else {
            output = CTOMono.caesarCrypt(this.keyValue, text, crypt, "remove", this.global_plaintextabc);
          }
        }
        return output;
    }
  }
};
export default ModelMixin;
