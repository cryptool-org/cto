var CTOMono = new function CTOMonoAlgorithm() {

    //@params:
    // text = plaintext/chipertext(string)
    // type = "decrypt" / "encrypt" (string)
    // handle = "ignore"->ignore invalid signs / else->remove invalid signs (string)
    this.crypt = function(plaintextabc, ciphertextabc, sensitive, text, type, handle) {
        plaintextabc = this.normalizeText(plaintextabc, sensitive);
        ciphertextabc = this.normalizeText(ciphertextabc, sensitive);

        if (type == "encrypt") {
            return this.encrypt(plaintextabc, ciphertextabc, text, handle);
        } else {
            return this.decrypt(plaintextabc, ciphertextabc, text, handle);
        }
    };

    this.encrypt = function(plaintextabc, ciphertextabc, text, handle) {
        var n = 0;
        var chiffre = "";
        for (var i = 0; i < text.length; i++) {
            n = plaintextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + ciphertextabc.charAt(n);
            else
            if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                chiffre = chiffre + text.charAt(i);
        }
        return chiffre;
    };

    this.decrypt = function(plaintextabc, ciphertextabc, text, handle) {
        var n = 0;
        var chiffre = "";
        for (var i = 0; i < text.length; i++) {
            n = ciphertextabc.indexOf(text.charAt(i));

            if (n >= 0)
                chiffre = chiffre + plaintextabc.charAt(n);
            else
            if (handle == "ignore" || text.charCodeAt(i) == 13 || text.charCodeAt(i) == 32 || text.charCodeAt(i) == 10)
                chiffre = chiffre + text.charAt(i);
        }
        return chiffre;
    };

    this.normalizeText = function(abc, sensitive = false) {
        if (!sensitive) {
            abc = abc.toLowerCase();
            abc += abc.toUpperCase();
        }
        return abc;
    };

    this.getKeyedAlphabet = function(key, alphabet) {
        var alph;
        if (key.length > 0) {
            alph = key + alphabet;
        } else {
            alph = alphabet;
        }

        for(let i = 0; i < alph.length; i++) {
            while (alph.indexOf(alph[i], i+1) >= 0) {
                alph = alph.slice(0, alph.lastIndexOf(alph[i])) + alph.slice(alph.lastIndexOf(alph[i])+1);
            }
        }
        return alph;
    };

    //@author Christian Sieche
    //@version 23.12.2008
    //@params:
    // key = key(int)
    // text = plaintext/chipertext(string)
    // type = "decrypt" / "encrypt" (string)
    // handle = "ignore"->ignore invalid signs / else->remove invalid signs (string)
    this.caesarCrypt = function(key, text, type, handle, alphabet) {
        var alphaLen = alphabet.length;
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
};
export default CTOMono;
