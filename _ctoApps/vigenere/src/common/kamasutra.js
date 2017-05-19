"use strict";

function Kamasutra() {

    this.encrypt = function (val, idx, key, alphabets) {

        var testAlpha = "liqptsfnjodvcwregkyambuhzx";
        //l   i   q   p   t   s   f   n   j   o   d   v   c
        //w   r   e   g   k   y   a   m   b   u   h   z   x

        /*var alpha = [];
        var alphaLength = alphabets[0].getElementsByClassName('alphabet')[0].value.length;

        for(var i = 0; i < alphaLength; i++) {
            alpha[i] = alphabets[0].getElementsByClassName('alphabet')[0].value.charAt(i);
        }*/
        //alert(alpha[2]);

        var alpha1 = [];
        var alpha2 = [];
        for(var j = 0; j < testAlpha.length / 2; j++)
        {
            alpha1[j] = testAlpha[j];
            alpha2[j] = testAlpha[j+13];
        }

        return this.substitute(val, alpha1, alpha2);
    };
    this.decrypt = function (val, idx, key, alphabets) {
        return this.encrypt(val, idx, key);
    };

    this.substitute = function (val, alpha1, alpha2) {
        var idInAlpha;
        for(var i = 0; i < alpha1.length; i++)
        {
            if(alpha1[i] == String.fromCharCode(val + 97))
            {
                idInAlpha = i;
                return alpha2[idInAlpha].charCodeAt() - 97;
            }
        }
        for(var j = 0; j < alpha2.length; j++)
        {
            if(alpha2[j] == String.fromCharCode(val + 97))
            {
                idInAlpha = j;
                return alpha1[idInAlpha].charCodeAt() - 97;
            }
        }
        return alpha2[idInAlpha].charCodeAt() - 97;
    }
 }

Kamasutra.prototype = new Vigenere();
algo = new Kamasutra();