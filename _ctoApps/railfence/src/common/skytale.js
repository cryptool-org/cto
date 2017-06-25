"use strict";

function Skytale() {
    this.encrypt = function (val, idx, key, alphabets, msg) {
        var result = "";

        var allAlphabets = "";
        for(var i = 0; i < alphabets.length; i++) {
            allAlphabets += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }

        var regex = new RegExp('[^' + allAlphabets + ']', 'g');
        msg = msg.replace(regex, '');

        var turns = document.getElementById("turns").value;
        var rowsCount = Math.ceil(msg.length / turns);
        var rows = [];

        for(var i= 0; i < rowsCount; i++) {
            rows[i] = "";
        }

        for(var i = 0; i < rowsCount; i++) {
            for(var j = 0; j < turns; j++) {
                rows[i] += msg.charAt(0);
                msg = msg.substring(1);
            }
        }

        for(var i = 0; i < turns; i++) {
            for(var j = 0; j < rowsCount; j++) {
                if(rows[j].charAt(i))
                    result += rows[j].charAt(i);
                else
                    rows[j] += " ";
            }
        }

        document.getElementById("railfence-display").value = "";
        for(var k = 0; k < rows.length; k++) {
            document.getElementById("railfence-display").value += "| ";
            for(var j = 0; j < turns; j++) {
                document.getElementById("railfence-display").value += rows[k].charAt(j) + " | ";
            }
            document.getElementById("railfence-display").value += "\n";
        }

        return result.charAt(idx);
    };
    this.decrypt = function (val, idx, key, alphabets, msg) {
        var result = "";

        var allAlphabets = "";
        for(var i = 0; i < alphabets.length; i++) {
            allAlphabets += alphabets[i].getElementsByClassName('alphabet')[0].value;
        }

        var regex = new RegExp('[^' + allAlphabets + ']', 'g');
        msg = msg.replace(regex, '');


        var turns = document.getElementById("turns").value;
        var rowsCount = Math.ceil(msg.length / turns);
        var rows = [];

        var rest = 0;
        if(msg.length % turns != 0)
            rest = turns - (msg.length % turns);

        for(var i= 0; i < rowsCount; i++) {
            rows[i] = "";
        }

        for(var i = 0; i < turns; i++) {
            if(i < turns - rest) {
                for (var j = 0; j < rowsCount; j++) {
                    rows[j] += msg.charAt(0);
                    msg = msg.substring(1);
                }
            }else {
                for (var j = 0; j < rowsCount-1; j++) {
                    rows[j] += msg.charAt(0);
                    msg = msg.substring(1);
                }
            }
        }
        result = rows.join("");

        for(var i = 0; i < rest; i++) {
            rows[rowsCount-1] += " ";
        }

        document.getElementById("railfence-display").value = "";
        for(var k = 0; k < rows.length; k++) {
            document.getElementById("railfence-display").value += "| ";
            for(var j = 0; j < turns; j++) {
                document.getElementById("railfence-display").value += rows[k].charAt(j) + " | ";
            }
            document.getElementById("railfence-display").value += "\n";
        }

        return result.charAt(idx);
    };
}
let algo = new Skytale();