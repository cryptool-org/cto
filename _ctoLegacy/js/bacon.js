//*******************************
//*******************************

function CTOBaconGuiAccess ()
{
	var ctolib = new CTOLib();

	//@author Christian Sieche
	//@version 30.12.2008
	//@params:
	// type = "encode" or "decode"
    this.baconCrypt = baconCrypt;
    function baconCrypt(type) //starts encryption
    {
        //set value to radiogroup
        if (type == "encode")
        {
            document.CTOBaconForm1.code[0].checked = true;
            document.CTOBaconForm1.code[1].checked = false;
        }

        if (type == "decode")
        {
            document.CTOBaconForm1.code[0].checked = false;
            document.CTOBaconForm1.code[1].checked = true;
        }
        //get value of radiogroup
        var type;
        for (var i = 0; i < document.CTOBaconForm1.code.length; i++)
			if (document.CTOBaconForm1.code[i].checked)
                type = document.CTOBaconForm1.code[i].value;

        if (type == "encode")
        {
			var plaintext = document.getElementById("orgtxt").value;
			//remove blanks
        	plaintext = plaintext.replace(/ /g, "");

        	//check if its valid
        	plaintext=plaintext.toLowerCase();
        	if (ctolib.inputString(plaintext, "abcdefghijklmnopqrstuvwxyz") == false)
        	{
        		document.getElementById("orgtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';

        	//encode
        	var arr=plaintext.split("");
        	var output="";
			for (var i=0; i<arr.length; i++)
			{
			  var tmp=arr[i];
			  switch (tmp)
			  {
    	           case "a": output+="aaaaa";
                   break;
                   case "b": output+="aaaab";
                   break;

                   case "c": output+="aaaba";
                   break;
                   case "d": output+="aaabb";
                   break;

                   case "e": output+="aabaa";
                   break;
                   case "f": output+="aabab";
                   break;

                   case "g": output+="aabba";
                   break;
                   case "h": output+="aabbb";
                   break;

                   case "i": output+="abaaa";
                   break;
                   case "j": output+="abaaa";
                   break;
                   case "k": output+="abaab";
                   break;

                   case "l": output+="ababa";
                   break;
                   case "m": output+="ababb";
                   break;

                   case "n": output+="abbaa";
                   break;
                   case "o": output+="abbab";
                   break;

                   case "p": output+="abbba";
                   break;
                   case "q": output+="abbbb";
                   break;

                   case "r": output+="baaaa";
                   break;
                   case "s": output+="baaab";
                   break;

                   case "t": output+="baaba";
                   break;
                   case "u": output+="baabb";
                   break;
                   case "v": output+="baabb";
                   break;

                   case "w": output+="babaa";
                   break;
				   case "x": output+="babab";
                   break;

                   case "y": output+="babba";
                   break;

                   case "z": output+="babbb";
                   break;

              }
            }
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
        	ciphertext=ciphertext.toLowerCase();
        	if (ciphertext.length % 5 !=0 || ctolib.inputString(ciphertext, "ab") == false)
        	{
        		document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
        	}
        	else document.getElementById("codtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';
        	document.getElementById("orgtxt").className = 'ctoformcss-txtinput-style ctoformcss-default-input-size';


        	//split into blocks
			var arr=ctolib.str_split(ciphertext, 5);
			var output="";
			var error=false;
			for (var i=0; i<arr.length; i++)
			{
			  var tmp=arr[i];
			  switch (tmp)
			  {
    	           case "aaaaa": output+="A";
                   break;
                   case "aaaab": output+="B";
                   break;

                   case "aaaba": output+="C";
                   break;
                   case "aaabb": output+="D";
                   break;

                   case "aabaa": output+="E";
                   break;
                   case "aabab": output+="F";
                   break;

                   case "aabba": output+="G";
                   break;
                   case "aabbb": output+="H";
                   break;

                   case "abaaa": output+="I";
                   break;
                   case "abaab": output+="K";
                   break;

                   case "ababa": output+="L";
                   break;
                   case "ababb": output+="M";
                   break;

                   case "abbaa": output+="N";
                   break;
                   case "abbab": output+="O";
                   break;

                   case "abbba": output+="P";
                   break;
                   case "abbbb": output+="Q";
                   break;

                   case "baaaa": output+="R";
                   break;
                   case "baaab": output+="S";
                   break;

                   case "baaba": output+="T";
                   break;
                   case "baabb": output+="U";
                   break;

                   case "babaa": output+="W";
                   break;
				   case "babab": output+="X";
                   break;

                   case "babba": output+="Y";
                   break;

                   case "babbb": output+="Z";
                   break;
                   error=true;
              }
              if (error==true) document.getElementById("codtxt").className = 'ctoformcss-invalid-style ctoformcss-default-input-size';
			}
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
var CTOBaconScripts = new CTOBaconGuiAccess();