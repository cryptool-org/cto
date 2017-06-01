"use strict";

function Rotation() {



    this.encrypt = function (val, idx, key, alphabets, from) {
        var blocksize = document.getElementById("textParam").value;
        var degree = document.getElementById("dropdown").value;
        var result = val;
        var tmpVal;

        switch (degree) {
            case "90":
                tmpVal = this.rotate90(from, blocksize).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    }
                    else {
                        result = tmpVal.charCodeAt() - 97;
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }

            case "180":
                tmpVal = this.rotate180(from).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    } else {
                        result = tmpVal.charCodeAt() - 97
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }

            case "270":
                tmpVal = this.rotate180(this.rotate90(from, blocksize)).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    }
                    else {
                        result = tmpVal.charCodeAt() - 97;
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }
        }
        return result;
    };
    this.decrypt = function (val, idx, key, alphabets, from) {
        var blocksize = document.getElementById("textParam").value;
        var degree = document.getElementById("dropdown").value;
        var result = val;
        var tmpVal;

        switch (degree) {
            case "90":
                tmpVal = this.rotate90D(from, blocksize).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    }
                    else {
                        result = tmpVal.charCodeAt() - 97;
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }

            case "180":
                tmpVal = this.rotate180(from).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    } else {
                        result = tmpVal.charCodeAt() - 97
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }

            case "270":
                tmpVal = this.rotate90D(this.rotate180(from), blocksize).charAt(idx);
                if(isNaN(tmpVal)) {
                    if (tmpVal == tmpVal.toUpperCase()) {
                        result = tmpVal.charCodeAt() - 65;
                        break;
                    }
                    else {
                        result = tmpVal.charCodeAt() - 97;
                        break;
                    }
                }else{
                    result = tmpVal;
                    break;
                }
        }
        return result;
    };

    this.rotate90 = function (from, blocksize) {
        var text = from.replace(/\W+/g, '');
        var array = this.str_split(text, blocksize);
        var output="";
        for (var j=0; j<blocksize; j++)
        {
            for (var i=(array.length-1); i>=0; i--)
            {
                output+=array[i].charAt(j);
            }
        }
        return output;
    }

    this.rotate180 = function (from) {
        var text = from.replace(/\W+/g, '');
        var output="";
        for (var i=text.length; i>=0; i--) output+=text.charAt(i);
        return output;
    }

    this.rotate90D = function (from, blocksize) {
        var text = from.replace(/\W+/g, '');

        //oversize
        var ueber=text.length % blocksize;
        //array size
        var arraysize=parseInt(text.length / blocksize);
        //create array
        var outarray = new Array(arraysize+1);

        var output="";
        var i;

        for (i=0; i<=arraysize; i++)
        {
            outarray[i]="";
        }

        var j=0;
        while (j<text.length)
        {
            for (i=arraysize; i>=0; i--)
            {
                //oversize
                if (i==arraysize)
                {
                    if (ueber>0)
                    {
                        outarray[i]+=text.charAt(j);
                        ueber--;
                    }
                    else j--;
                }
                else outarray[i]+=text.charAt(j);
                j++;
            }
        }
        output=outarray.join("");
        return output;
    }

    this.str_split = function(input, splitlength) {
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

Rotation.prototype = new Vigenere();
algo = new Rotation();