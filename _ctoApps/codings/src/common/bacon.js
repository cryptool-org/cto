"use strict";

function Bacon() {
    this.encrypt = function (alphabets, input) {
        var output = "";

        input = input.replace(/[^A-Za-z]/g, "");

        var arr = input.split("");

        for (var i=0; i<arr.length; i++) {
            var tmp = arr[i];
            switch (tmp) {
                case "A":
                case "a":
                    output += "aaaaa ";
                    break;
                case "B":
                case "b":
                    output += "aaaab ";
                    break;

                case "C":
                case "c":
                    output += "aaaba ";
                    break;
                case "D":
                case "d":
                    output += "aaabb ";
                    break;

                case "E":
                case "e":
                    output += "aabaa ";
                    break;
                case "F":
                case "A":
                    output += "aabab ";
                    break;

                case "G":
                case "g":
                    output += "aabba ";
                    break;
                case "H":
                case "h":
                    output += "aabbb ";
                    break;

                case "I":
                case "i":
                case "J":
                case "j":
                    output += "abaaa ";
                    break;
                case "K":
                case "k":
                    output += "abaab ";
                    break;

                case "L":
                case "l":
                    output += "ababa ";
                    break;
                case "M":
                case "m":
                    output += "ababb ";
                    break;

                case "N":
                case "n":
                    output += "abbaa ";
                    break;
                case "O":
                case "o":
                    output += "abbab ";
                    break;

                case "P":
                case "p":
                    output += "abbba ";
                    break;
                case "Q":
                case "q":
                    output += "abbbb ";
                    break;

                case "R":
                case "r":
                    output += "baaaa ";
                    break;
                case "S":
                case "s":
                    output += "baaab ";
                    break;

                case "T":
                case "t":
                    output += "baaba ";
                    break;
                case "U":
                case "u":
                case "V":
                case "v":
                    output += "baabb ";
                    break;

                case "W":
                case "w":
                    output += "babaa ";
                    break;
                case "X":
                case "x":
                    output += "babab ";
                    break;

                case "Y":
                case "y":
                    output += "babba ";
                    break;

                case "Z":
                case "z":
                    output += "babbb ";
                    break;

            }
        }

        return output;
    };
    this.decrypt = function (alphabets, input) {

        var output = "";

        input = input.replace(/[^ABab]/g, "");

        input = input.toLowerCase();

        var arr=this.str_split(input, 5);

        for (var i=0; i<arr.length; i++) {
            var tmp = arr[i];
            switch (tmp) {
                case "aaaaa":
                    output += "A";
                    break;
                case "aaaab":
                    output += "B";
                    break;

                case "aaaba":
                    output += "C";
                    break;
                case "aaabb":
                    output += "D";
                    break;

                case "aabaa":
                    output += "E";
                    break;
                case "aabab":
                    output += "F";
                    break;

                case "aabba":
                    output += "G";
                    break;
                case "aabbb":
                    output += "H";
                    break;

                case "abaaa":
                    output += "I";
                    break;
                case "abaab":
                    output += "K";
                    break;

                case "ababa":
                    output += "L";
                    break;
                case "ababb":
                    output += "M";
                    break;

                case "abbaa":
                    output += "N";
                    break;
                case "abbab":
                    output += "O";
                    break;

                case "abbba":
                    output += "P";
                    break;
                case "abbbb":
                    output += "Q";
                    break;

                case "baaaa":
                    output += "R";
                    break;
                case "baaab":
                    output += "S";
                    break;

                case "baaba":
                    output += "T";
                    break;
                case "baabb":
                    output += "U";
                    break;

                case "babaa":
                    output += "W";
                    break;
                case "babab":
                    output += "X";
                    break;

                case "babba":
                    output += "Y";
                    break;

                case "babbb":
                    output += "Z";
                    break;
            }
        }

        return output;
    };
    this.str_split = function (input, splitlength)
    {
        input += '';

        if (splitlength > 0)
        {
            var output = [];
            while (input.length > splitlength)
            {
                output[output.length] = input.substring(0, splitlength);
                input = input.substring(splitlength);
            }
            output[output.length] = input;

            return output;
        }

        return false;
    }

}
let algo = new Bacon();