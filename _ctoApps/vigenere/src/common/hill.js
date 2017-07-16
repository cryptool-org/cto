"use strict";

function Hill() {
    this.algoName = "HILL";

    this.encrypt = function (val, idx, key, alphabets, msg) {
        var matSize = 2;
        if(document.getElementById("3x3").checked)
            matSize = 3;

        var alphabet = alphabets[0].getElementsByClassName('alphabet')[0].value;

        var i;
        var c = "";
        var ascA = this.ord('A');
        var regex = new RegExp('[^' + alphabet + ']', 'g');
        msg = msg.toUpperCase().replace(regex, '');
        if (msg.length === 0) {return "";}
        var len = msg.length;
        var matrx = key;

        if ( matrx.length < (matSize * matSize) ) {return "";}

        var determinant = this.getDeterminant(matrx, alphabet);
        if ( determinant === 0 || this.gcd(alphabet.length, determinant) > 1 ) {
            //alert("Invalid matrix. No inverse found.");
            return "";
        }

        if ( matSize === 2 ) {

            for ( i = 0; i < len; i += 2 ) {
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrx[0]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrx[1])) % alphabet.length);
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrx[2]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrx[3])) % alphabet.length);
            }
        } else {
            for ( i = 0; i < len; i += 3 ) {
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrx[0]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrx[1]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrx[2])) % alphabet.length );
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrx[3]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrx[4]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrx[5])) % alphabet.length );
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrx[6]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrx[7]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrx[8])) % alphabet.length);
            }
        }
        return c.charAt(idx).charCodeAt() - 65;
    };
    this.decrypt = function (val, idx, key, alphabets, msg) {
        var matSize = 2;
        if(document.getElementById("3x3").checked)
            matSize = 3;

        var alphabet = alphabets[0].getElementsByClassName('alphabet')[0].value;

        var i;
        var c = "";
        var ascA = this.ord('A');
        var regex = new RegExp('[^' + alphabet + ']', 'g');
        msg = msg.toUpperCase().replace(regex, '');
        if (msg.length === 0) {return "";}
        var len = msg.length;
        var matrx = key;

        if ( matrx.length < (matSize * matSize) ) {return "";}

        var determinant = this.getDeterminant(matrx, alphabet);
        if ( determinant === 0 || this.gcd(alphabet.length, determinant) > 1 ) {
            //alert("Invalid matrix. No inverse found.");
            return "";
        }
        var detInverse;
        for(var j = 1; j <= alphabet.length; j++) {
            if((j * determinant) % alphabet.length == 1)
                detInverse =  j;
        }

        var adjugate = [];
        if(matSize === 2) {
            adjugate[0] = matrx[3];
            adjugate[1] = (-1 * matrx[1]) + alphabet.length;
            adjugate[2] = (-1 * matrx[2]) + alphabet.length;
            adjugate[3] = matrx[0];
        }
        else {
            var adj1 = [];
            var adj2 = [];
            var adj3 = [];
            var adj4 = [];
            var adj5 = [];
            var adj6 = [];
            var adj7 = [];
            var adj8 = [];
            var adj9 = [];

            adj1[0] = matrx[4];
            adj1[1] = matrx[5];
            adj1[2] = matrx[7];
            adj1[3] = matrx[8];

            adj2[0] = matrx[1];
            adj2[1] = matrx[2];
            adj2[2] = matrx[7];
            adj2[3] = matrx[8];

            adj3[0] = matrx[1];
            adj3[1] = matrx[2];
            adj3[2] = matrx[4];
            adj3[3] = matrx[5];

            adj4[0] = matrx[3];
            adj4[1] = matrx[5];
            adj4[2] = matrx[6];
            adj4[3] = matrx[8];

            adj5[0] = matrx[0];
            adj5[1] = matrx[2];
            adj5[2] = matrx[6];
            adj5[3] = matrx[8];

            adj6[0] = matrx[0];
            adj6[1] = matrx[2];
            adj6[2] = matrx[3];
            adj6[3] = matrx[5];

            adj7[0] = matrx[3];
            adj7[1] = matrx[4];
            adj7[2] = matrx[6];
            adj7[3] = matrx[7];

            adj8[0] = matrx[0];
            adj8[1] = matrx[1];
            adj8[2] = matrx[6];
            adj8[3] = matrx[7];

            adj9[0] = matrx[0];
            adj9[1] = matrx[1];
            adj9[2] = matrx[3];
            adj9[3] = matrx[4];


            adjugate[0] = this.getDeterminant(adj1, alphabet);
            adjugate[1] = -1 * this.getDeterminant(adj2, alphabet) + alphabet.length;
            adjugate[2] = this.getDeterminant(adj3, alphabet);
            adjugate[3] = -1 * this.getDeterminant(adj4, alphabet) + alphabet.length;
            adjugate[4] = this.getDeterminant(adj5, alphabet);
            adjugate[5] = -1 * this.getDeterminant(adj6, alphabet) + alphabet.length;
            adjugate[6] = this.getDeterminant(adj7, alphabet);
            adjugate[7] = -1 * this.getDeterminant(adj8, alphabet) + alphabet.length;
            adjugate[8] = this.getDeterminant(adj9, alphabet);

        }

        var matrxInverse = [];
        for(var k = 0; k < adjugate.length; k++) {
            matrxInverse[k] = (adjugate[k] * detInverse) % alphabet.length;
        }

        if ( matSize === 2 ) {

            for ( i = 0; i < len; i += 2 ) {
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrxInverse[0]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrxInverse[1])) % alphabet.length);
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrxInverse[2]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrxInverse[3])) % alphabet.length);
            }
        } else {

            for ( i = 0; i < len; i += 3 ) {
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrxInverse[0]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrxInverse[1]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrxInverse[2])) % alphabet.length );
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrxInverse[3]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrxInverse[4]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrxInverse[5])) % alphabet.length );
                c += alphabet.charAt( (((this.ord(msg.charAt(i)) - ascA) * matrxInverse[6]) + ((this.ord(msg.charAt(i + 1)) - ascA) * matrxInverse[7]) + ((this.ord(msg.charAt(i + 2)) - ascA) * matrxInverse[8])) % alphabet.length);
            }
        }
        return c.charAt(idx).charCodeAt() - 65;
    };

    this.gcd = function (a, b) {
        if (b) {
            return this.gcd(b, a % b);
        } else {
            return Math.abs(a);
        }
    }

    this.getModuloRemainder = function ( num, modulo ) {
        var rem = ((num % modulo) + modulo) % modulo;
        return rem;
    }

    this.getDeterminant = function (matKey, alphabet) {
        var det;
        // Calculate determinant of matrix (ad - bc)
        if ( matKey.length === 4 ) {
            det = matKey[0] * matKey[3] - matKey[1] * matKey[2];
        } else {
            // Calculate determinant of matrix ( (aei + bfg + cdh) - (ceg + afh + bdi) )
            det = matKey[0] * matKey[4] * matKey[8] + matKey[1] * matKey[5] * matKey[6] + matKey[2] * matKey[3] * matKey[7];
            det -= ( matKey[2] * matKey[4] * matKey[6] + matKey[0] * matKey[5] * matKey[7] + matKey[1] * matKey[3] * matKey[8] );
        }
        det = this.getModuloRemainder( det, alphabet.length );
        return det;
    }

    this.ord = function (c) {
        return c.charCodeAt(0);
    }


}
Hill.prototype = new Vigenere();
algo = new Hill();