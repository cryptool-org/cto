//*******************************
//*******************************
function CTOAsciiGuiAccess ()
{
	var ctolib = new CTOLib();



//convert decimal to binary
//@author unknown
//@version 30.12.2008
//@params:
// dec (int)
function decToBin(dec)
{
var bits = [];
var dividend = dec;
var remainder = 0;
while (dividend >= 2)
{
	remainder = dividend % 2;
	bits.push(remainder);
	dividend = (dividend - remainder) / 2;
}
bits.push(dividend);
bits.reverse();
return bits.join("");
}



	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.asciiCrypt = asciiCrypt;
    function asciiCrypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOAsciiForm1.code[0].checked = true;
            document.CTOAsciiForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOAsciiForm1.code[0].checked = false;
            document.CTOAsciiForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOAsciiForm1.code.length; i++)
			if (document.CTOAsciiForm1.code[i].checked)
                type = document.CTOAsciiForm1.code[i].value;

		var output="";

        if (type == "encode")
        {
			var plaintext = document.getElementById("orgtxt").value;
			document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//encode
			for (var i=0; i<plaintext.length; i++)
			{
			    var dec=plaintext.charCodeAt(i);
			    var binStrg=decToBin(dec)+" ";
			    while (binStrg.length<9)
					binStrg="0"+binStrg;
				output+=binStrg;

            }

            document.getElementById("codtxt").value=output;



        }


        if (type == "decode")
        {
        	var ciphertext = document.getElementById("codtxt").value;
        	//remove blanks
        	ciphertext = ciphertext.replace(/ /g, "");

        	//check if length and alphabet are valid
        	if (ciphertext.length % 8 !=0 || ctolib.inputString(ciphertext, "01") == false)
        	{
        		document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//split into blocks
			var arr=ctolib.str_split(ciphertext, 8);
			for (var i=0; i<arr.length; i++)
			{
			  var tmp=arr[i];
			  var calc=parseInt(tmp,2)
			  output+=String.fromCharCode(calc);
			}
			document.getElementById("orgtxt").value=output;

        }

    }


}



//create adfgvx object with alphabet and start necessary scripts
var CTOAsciiScripts = new CTOAsciiGuiAccess();