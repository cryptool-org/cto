//*******************************
//*******************************


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}



function CTOBase64GuiAccess ()
{
	var ctolib = new CTOLib();

	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.base64Crypt = base64Crypt;
    function base64Crypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOBase64Form1.code[0].checked = true;
            document.CTOBase64Form1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOBase64Form1.code[0].checked = false;
            document.CTOBase64Form1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOBase64Form1.code.length; i++)
			if (document.CTOBase64Form1.code[i].checked)
                type = document.CTOBase64Form1.code[i].value;

        if (type == "encode")
        {
			var plaintext = document.getElementById("orgtxt").value;
			//remove blanks
        	plaintext = plaintext.replace(/ /g, "");

        	document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//check if its valid
        	if (ctolib.inputString(plaintext, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/") == false)
        	{
        		document.getElementById("orgtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//encode
        	var output=Base64.encode(plaintext);

            if (document.getElementById("cleancodtxt").checked)
            {
                var tmp = ctolib.str_split(output, 5);
                output = tmp.join(" ");
            }
            else
            {
            	var tmp = ctolib.str_split(output, 50);
                output = tmp.join(" ");
            }

            document.getElementById("codtxt").value=output;



        }


        if (type == "decode")
        {
        	var ciphertext = document.getElementById("codtxt").value;
        	//remove blanks
        	ciphertext = ciphertext.replace(/ /g, "");

        	//check if length and alphabet are valid
        	if (ctolib.inputString(ciphertext, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=") == false)
        	{
        		document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';


        	//split into blocks
			var output=Base64.decode(ciphertext)

			if (document.getElementById("cleanorgtxt").checked)
            {
                var tmp = ctolib.str_split(output, 5);
                output = tmp.join(" ");
            }
            else
            {
            	var tmp = ctolib.str_split(output, 45);
                output = tmp.join(" ");
            }

			document.getElementById("orgtxt").value=output;

        }

    }


}



//create adfgvx object with alphabet and start necessary scripts
var CTOBase64Scripts = new CTOBase64GuiAccess();