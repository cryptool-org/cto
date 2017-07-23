"use strict";

function Morsecode() {
    this.encrypt = function (alphabets, input) {
        var output = "";
        input = input.replace(/[^a-zA-Z0-9äöü!@#\$%\^\&*\)\(+=._-\s]/g, "");
        input = input.toLowerCase();

        var arr = input.split("");

        for(var i = 0; i < arr.length; i++) {
            output += this.enMorse(arr[i]);
        }

        return output;
    };
    this.decrypt = function (alphabets, input) {
        var output = "";
        input = input.replace(/[^/\\.\-\s]/g, "");

        var arr = input.split(" ");

        for(var i = 0; i < arr.length; i++) {
            output += this.deMorse(arr[i]);
        }

        return output;
    };

    this.enMorse = function(character) {

        var output="";
        switch (character)
        {
            case "a": output+=".- ";
                break;
            case "b": output+="-... ";
                break;

            case "c": output+="-.-. ";
                break;
            case "d": output+="-.. ";
                break;

            case "e": output+=". ";
                break;
            case "f": output+="..-. ";
                break;

            case "g": output+="--. ";
                break;
            case "h": output+=".... ";
                break;

            case "i": output+=".. ";
                break;
            case "j": output+=".--- ";
                break;
            case "k": output+="-.- ";
                break;

            case "l": output+=".-.. ";
                break;
            case "m": output+="-- ";
                break;

            case "n": output+="-. ";
                break;
            case "o": output+="--- ";
                break;

            case "p": output+=".--. ";
                break;
            case "q": output+="--.- ";
                break;

            case "r": output+=".-. ";
                break;
            case "s": output+="... ";
                break;

            case "t": output+="- ";
                break;
            case "u": output+="..- ";
                break;
            case "v": output+="...- ";
                break;

            case "w": output+=".-- ";
                break;

            case "x": output+="-..- ";
                break;

            case "y": output+="-.-- ";
                break;

            case "z": output+="--.. ";
                break;

            case "1": output+=".---- ";
                break;
            case "2": output+="..--- ";
                break;

            case "3": output+="...-- ";
                break;
            case "4": output+="....- ";
                break;
            case "5": output+="..... ";
                break;

            case "6": output+="-.... ";
                break;

            case "7": output+="--... ";
                break;

            case "8": output+="---.. ";
                break;

            case "9": output+="----. ";
                break;

            case "0": output+="----- ";
                break;


            case " ": output+="/ ";
                break;


            case ".": output+=".-.-.- ";
                break;

            case ",": output+="--..-- ";
                break;

            case "?": output+="..--..  ";
                break;

            case "'": output+=".----. ";
                break;

            case "!": output+="-.-.-- ";
                break;

            case "/": output+="-..-. ";
                break;

            case "(": output+="-.--. ";
                break;

            case ")": output+="-.--.- ";
                break;

            case "&": output+=".-... ";
                break;

            case "@": output+=".--.-. ";
                break;

            case "$": output+="...-..- ";
                break;

            case '"': output+=".-..-. ";
                break;
            case "_": output+="..--.- ";
                break;

            case "-": output+="-....- ";
                break;
            case "+": output+=".-.-. ";
                break;
            case "=": output+="-...- ";
                break;

            case ";": output+="-.-.-. ";
                break;

            case ":": output+="---... ";
                break;


            case "ä": output+=".-.- ";
                break;
            case "ö": output+="---. ";
                break;

            case "ü": output+="..-- ";
                break;
        }
        return (output);
    }

    this.deMorse = function(fragment) {
        var output = "";
        switch (fragment)
        {
            case ".-": output="A";
                break;
            case "-...": output="B";
                break;

            case "-.-.": output="C";
                break;
            case "-..": output="D";
                break;

            case ".": output="E";
                break;
            case "..-.": output="F";
                break;

            case "--.": output="G";
                break;
            case "....": output="H";
                break;

            case "..": output="I";
                break;

            case ".---": output="J";
                break;

            case "-.-": output="K";
                break;

            case ".-..": output="L";
                break;
            case "--": output="M";
                break;

            case "-.": output="N";
                break;
            case "---": output="O";
                break;

            case ".--.": output="P";
                break;
            case "--.-": output="Q";
                break;

            case ".-.": output="R";
                break;
            case "...": output="S";
                break;

            case "-": output="T";
                break;

            case "..-": output="U";
                break;

            case "...-": output="V";
                break;

            case ".--": output="W";
                break;

            case "-..-": output="X";
                break;

            case "-.--": output="Y";
                break;

            case "--..": output="Z";
                break;

            case "-----": output="0";
                break;
            case ".----": output="1";
                break;

            case "..---": output="2";
                break;
            case "...--": output="3";
                break;

            case "....-": output="4";
                break;
            case ".....": output="5";
                break;

            case "-....": output="6";
                break;

            case "--...": output="7";
                break;

            case "---..": output="8";
                break;

            case "----.": output="9";
                break;

            case "/": output=" ";
                break;

            case ".-.-.-": output=".";
                break;
            case "--..--": output=",";
                break;

            case "..--..": output="?";
                break;
            case ".----.": output="'";
                break;

            case "-.-.--": output="!";
                break;
            case "-..-.": output="/";
                break;

            case "-.--.": output="(";
                break;

            case "-.--.-": output=")";
                break;

            case ".-...": output="&";
                break;

            case "---...": output=":";
                break;

            case "-.-.-.": output=";";
                break;
            case "-...-": output="=";
                break;

            case ".-.-.": output="+";
                break;
            case "-....-": output="-";
                break;

            case "..--.-": output="_";
                break;
            case ".-..-.": output='"';
                break;

            case "...-..-": output="$";
                break;

            case ".--.-.": output="@";
                break;

            case "---..": output="8";
                break;

            case ".-.-": output="Ä";
                break;

            case "---.": output="Ö";
                break;

            case "..--": output="Ü";
                break;

            case "": break;

            default:
                break;
        }
        return output;
    }


}
let algo = new Morsecode();