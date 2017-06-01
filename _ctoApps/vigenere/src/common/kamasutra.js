"use strict";

function Kamasutra() {

    this.encrypt = function (val, idx, key, alphabets) {


        var alpha1 = document.getElementById("inputField").value;
        var alpha2 = alpha1.substr((alpha1.length/2));
        alpha1 = alpha1.substr(0,(alpha1.length/2));


        if(alpha1.length != alpha2.length)
            return val;

        return this.substitute(val, alpha1, alpha2);




        return this.substitute(val, array1, array2);
    };
    this.decrypt = function (val, idx, key, alphabets) {
        return this.encrypt(val, idx, key);
    };

    this.substitute = function (val, alpha1, alpha2) {
        var idInAlpha;
        for(var i = 0; i < alpha1.length; i++)
        {
            if(alpha1.charAt(i) == String.fromCharCode(val + 65))
            {
                idInAlpha = i;
                return alpha2.charAt(idInAlpha).charCodeAt() - 65;
            }
        }
        for(var j = 0; j < alpha2.length; j++)
        {
            if(alpha2.charAt(j) == String.fromCharCode(val + 65))
            {
                idInAlpha = j;
                return alpha1.charAt(idInAlpha).charCodeAt() - 65;
            }
        }
        return val;
    }
 }

Kamasutra.prototype = new Vigenere();
algo = new Kamasutra();