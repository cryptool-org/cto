"use strict";

function Rotation() {



    this.encrypt = function (val, idx, key, alphabets, from) {
        //var ctolib = new CTOLib();

        var blocksize = 5;
        var degree = 270;
        var result = val;

        switch (degree) {
            case 90:
                var result = this.rotate90(from, blocksize).charAt(idx).charCodeAt() - 97;
                break;

            case 180:
                var result = this.rotate180(from).charAt(idx).charCodeAt() - 97;
                break;

            case 270:
                var result = this.rotate180(this.rotate90(from, blocksize)).charAt(idx).charCodeAt() - 97;
        }

        return result;
    };
    this.decrypt = function (val, idx, key, aplhabets, from) {
        var blocksize = 5;
        var degree = 270;
        var result = val;

        switch (degree) {
            case 90:
                var result = this.rotate90D(from, blocksize).charAt(idx).charCodeAt() - 97;
                break;

            case 180:
                var result = this.rotate180(from).charAt(idx).charCodeAt() - 97;
                break;

            case 270:
                var result = this.rotate90D(this.rotate180(from), blocksize).charAt(idx).charCodeAt() - 97;
        }

        return result;
    };

    this.rotate90 = function (from, blocksize) {
        var array = this.str_split(from, blocksize);
        var arrayLength=array.length;
        var output="";
        for (var j=0; j<blocksize; j++)
        {
            for (var i=(arrayLength-1); i>=0; i--)
            {
                output+=array[i].charAt(j);
            }
        }
        return output;
    }

    this.rotate180 = function (from) {
        var textlength = from.length;
        var output="";
        for (var i=textlength; i>=0; i--) output+=from.charAt(i);
        return output;
    }

    this.rotate90D = function (from, blocksize) {
        var textlength=from.length;

        //oversize
        var ueber=textlength % blocksize;
        //array size
        var arraysize=parseInt(textlength / blocksize);
        //create array
        var outarray = new Array(arraysize+1);

        var output="";
        var i;

        for (i=0; i<=arraysize; i++)
        {
            outarray[i]="";
        }

        var j=0;
        while (j<textlength)
        {
            for (i=arraysize; i>=0; i--)
            {
                //oversize
                if (i==arraysize)
                {
                    if (ueber>0)
                    {
                        outarray[i]+=from.charAt(j);
                        ueber--;
                    }
                    else j--;
                }
                else outarray[i]+=from.charAt(j);
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