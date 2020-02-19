export default function CaesarAlgorithm(alpha) {
    var alphabet = alpha;

    this.getAlphabet = function() {
        return alphabet;
    }

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    // key = key(int)
    // text = plaintext/chipertext(string)
    // type = "decrypt" / "encrypt" (string)
    // handle = "ignore"->ignore invalid signs / else->remove invalid signs (string)
    this.crypt = function(key, text, type, handle) {
        var alphaLen = this.getAlphabet().length;
        var n = 0;
        var chiffre = "";

        if (type == "decrypt") {
            key = alphaLen - key;
        }
        key = key % alphaLen;
        for (let i = 0; i < text.length; i++) {
            n = this.getAlphabet().indexOf(text.charAt(i));

            if (n >= 0) {
                chiffre = chiffre + this.getAlphabet().charAt((n + key) % alphaLen);
            }
            else if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10) {
                chiffre = chiffre + text.charAt(i);
            }
        }
        return chiffre;
    }

    this.monocrypt = function(plaintextabc, ciphertextabc, sensitive, text, type, handle) {
        if (sensitive==false) {
          plaintextabc=plaintextabc.toLowerCase();
          ciphertextabc=ciphertextabc.toLowerCase();
          plaintextabc+=plaintextabc.toUpperCase();
          ciphertextabc+=ciphertextabc.toUpperCase();
        }

       if (type=="encrypt") {
        var alphaLen = plaintextabc.length;
        var i, n = 0;
        var chiffre = "";

        for (i = 0; i < text.length; i++) {
            n = plaintextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + ciphertextabc.charAt(n);
            else
                if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    chiffre = chiffre + text.charAt(i);
        }
       } else {
        var alphaLen = ciphertextabc.length;
        var i, n = 0;
        var chiffre = "";

        for (i = 0; i < text.length; i++) {
            n = ciphertextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + plaintextabc.charAt(n);
            else
                if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                    chiffre = chiffre + text.charAt(i);
        }
      }
      return chiffre;
    }
};
