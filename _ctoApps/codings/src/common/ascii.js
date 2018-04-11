"use strict";

function Ascii() {
    
    this.padStringWithLeadingZeros = function(_string, _length) {
        var string = _string;
        while(string.length < _length) {
            string = "0" + string;
        }
        return string;
    };
    
    this.encrypt = function (_alphabets, _input) {
        var output = "";
        var input = _input;
        for(var i=0; i<input.length; i++) {
            if(output.length > 0) {
                output += " ";
            }
            output += this.padStringWithLeadingZeros((input.charCodeAt(i) >>> 0).toString(2), 8);
        }
        return output;
    };
    
    this.decrypt = function (_alphabets, _input) {
        var output = "";
        var input = _input;
        input = input.replace(/[^0-1]+/g, "");
        while(input.length >= 8) {
            var integerString = input.substr(0, 8);
            var integerDecimal = parseInt(integerString, 2).toString(10);
            output += String.fromCharCode(integerDecimal);
            input = input.substr(8, input.length - 8);
        }
        return output;
    };
    
}

let algo = new Ascii();
